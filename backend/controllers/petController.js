const { Pet } = require("../models/schemas/petSchema");
const { Requests } = require("../models/schemas/requestsSchema");
const { Social } = require("../models/schemas/socialSchema");
const { filterPets, search } = require("../utils/search");

/**
 * Get all Pets along with their socials OR Get specific pet along with their social, includes filterOptions in request
 * @param search: string
 * @param filterOptions: FilterOptions
 * FilterOptions - [minAge, maxAge, gender, health, breed]
 */
const getPets = async (req, res) => {
  let searchText = req.query.searchText;
  let filterOptions = {
    minAge: null,
    maxAge: null,
    gender: null,
    health: null,
    breed: null,
    point: { lat: null, long: null },
  };

  if (req.query.minAge) {
    try {
      let age;
      age = parseInt(req.query.minAge);
      if (Number(age)) filterOptions.minAge = age;
    } catch (err) {
      console.log(err);
    }
  }
  if (req.query.maxAge) {
    try {
      let age;
      age = parseInt(req.query.maxAge);
      if (Number(age)) filterOptions.maxAge = age;
    } catch (err) {
      console.log(err);
    }
  }
  if (req.query.gender) {
    let gender;
    gender = req.query.gender;
    gender = gender.toUpperCase();

    if (gender === "MALE") gender = 1;
    else if (gender === "FEMALE") gender = 2;
    else gender = 3;

    filterOptions.gender = gender;
  }
  if (req.query.health) {
    let health;
    health = req.query.health;
    health = health.toUpperCase();

    console.log(health);

    if (health === "HEALTHY") health = 1;
    else if (health === "MINOR INJURY") health = 2;
    else if (health === "SERIOUS INJURY") health = 3;
    else health = 4;

    filterOptions.health = health;
  }
  if (req.query.breed) {
    let breed;
    breed = req.query.breed;
    breed = breed.toUpperCase();

    if (breed === "HUSKY") breed = 1;
    else breed = 2;

    filterOptions.breed = breed;
  }

  if (req.query.latitude && req.query.longitude) {
    filterOptions.point.lat = req.query.latitude;
    filterOptions.point.long = req.query.longitude;
  }

  let response;
  if (searchText && searchText.trim() !== "") {
    response = await search(searchText, filterOptions);
  } else {
    response = await search("", filterOptions);
  }

  // Pagination
  let limit = parseInt(req.query.limit);
  if (!limit) {
    limit = 12;
  }

  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }

  const pageCount = Math.ceil(response.length / limit);

  if (page > pageCount) {
    page = pageCount;
  }

  response = response.slice(page * limit - limit, page * limit);

  //console.log("response", response);

  return res.json({
    response: response,
  });
};

// Add Pet
const addPet = async (req, res) => {
  // console.log("Request:", req.body);
  const newPet = new Pet(req.body.data);
  console.log(newPet);

  try {
    await newPet.save();
    console.log("Request:", req.body);
    res.status(200).send("Pet Successfully added");
  } catch (err) {
    res.send(err);
  }
};

const getPetsByUserID = async (req, res) => {
  let UserID = req.params.UserID;

  try {
    let response = await Pet.find({ RescuerID: UserID });
    res.status(200).send({
      status: "success",
      message: "Pets added by Users",
      response: response,
    });
  } catch (err) {}
};

const getPetByPetID = async (req, res) => {
  let PetID = req.params.PetID;
  try {
    let response = await Pet.find({ PetID: PetID }).populate({
      path: "social",
      populate: {
        path: "author",
      },
    });
    res.status(200).send({
      status: "success",
      message: `Pets for ${PetID} PetID`,
      response: response[0],
    });
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

// Update Pet
const updatePet = async (req, res) => {};

// Delete Pet
const deletePet = async (req, res) => {};

// Request pet for Adoption
const requestPet = async (req, res) => {
  // key-value pairs (userID- Requested. PetID)
  // A user can request for only one pet at a time, user has to retrive his request to make new request

  const PetID = req.body.PetID;
  const UserID = req.body.UserID;

  try {
    let response = await Requests.find({
      PetID: PetID,
      Requests: { $in: [UserID] },
    });

    // User has already requested for the same pet
    if (response.length > 0)
      res.status(200).send({
        status: "success",
        message: "User already requested",
        response: PetID,
      });
    else {
      try {
        let response = await Requests.find({
          Requests: { $elemMatch: { $eq: UserID } },
        });

        if (response.length > 0 && response[0].Requests.length > 0) {
          // User has already requested somewhere else
          res.status(400).send({
            status: "success",
            message: "User has already requested in the below PetID",
            response: response[0].PetID,
          });
        } else {
          try {
            let response = await Requests.find({ PetID: PetID });
            if (response.length == 0) {
              const newRequest = new Requests({
                PetID: PetID,
                Requests: [],
              });
              response = await newRequest.save();
            }

            await Requests.updateOne(
              { PetID: PetID },
              { $push: { Requests: UserID } }
            );

            res.status(200).send({
              status: "success",
              message: "UserID successfully pushed",
            });
          } catch (err) {
            res.status(400).send({ status: "failed", error: err });
          }
        }
      } catch (err) {
        res.status(400).send({ status: "failed", error: err });
      }
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const deleteRequest = async (req, res) => {
  // Delete user's previous request to make the new request
  const UserID = req.body.UserID;
  try {
    // Get the user's requested response
    let response = await Requests.find({
      Requests: { $elemMatch: { $eq: UserID } },
    });

    if (response && response[0].Requests.length > 0) {
      let PetID = response[0].PetID;
      try {
        let response = await Requests.updateOne(
          { PetID: PetID },
          { $pullAll: { Requests: [UserID] } }
        );

        console.log(response);

        res.status(200).send({
          status: "success",
          message: "UserID successfully pulled",
        });
      } catch (err) {
        res.status(400).send({ status: "failed", error: err });
      }
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

//Adopt pet
const adoptPet = async (req, res) => {
  // Rescuer can only call this fxn and approve user's request & making pet status true in petSchema and RequestSchema

  const PetID = req.body.PetID;
  const UserID = req.body.UserID;
  const RescuerID = req.body.RescuerID;

  // Check the Person calling this route is Rescuer

  try {
    let response = await Pet.find({ PetID: PetID });

    if (response && response[0].RescuerID == RescuerID && !response[0].Status) {
      // Check PetID and UserID in RequestSchema documents
      try {
        let response = await Requests.find({
          PetID: PetID,
          Requests: { $in: [UserID] },
        });

        if (response && response[0].Requests.length > 0) {
          // Change Adopt status to true
          await Requests.findOneAndUpdate({ PetID: PetID }, { Status: true });
          await Pet.findOneAndUpdate(
            { PetID: PetID },
            { Status: true, AdopterID: UserID }
          );

          res.status(200).send({
            status: "success",
            message: `${PetID} Pet is adopted by ${UserID} user`,
          });
        }
      } catch (err) {
        res.status(400).send({ status: "failed", message: err });
      }
    } else {
      // Something went wrong, Pet cannot be adopted
      res
        .status(200)
        .send({ status: "failed", message: "Pet cannot be adopted" });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", message: err });
  }
};

const getRequestByUserID = async (req, res) => {
  // Can be only one
  const UserID = req.params.UserID;

  try {
    let response = await Requests.find({
      Requests: { $elemMatch: { $in: UserID } },
    });

    if (response && response[0].PetID) {
      res.status(200).send({ status: "success", PetID: response[0].PetID });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const getRequestsByPetID = async (req, res) => {
  const PetID = req.params.PetID;

  try {
    let response = await Requests.find({
      PetID: PetID,
    });

    if (response) {
      res.status(200).send({ status: "success", Pet: response[0] });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const getRequestsByRescuerID = async (req, res) => {
  const RescuerID = req.params.RescuerID;

  // **Bug: Currently this function returns only one pet's requests
  // **Hint: We need to save forEarch(Pet) response in temp array then send all reponse at once

  try {
    let response = await Pet.find({ RescuerID: RescuerID });

    if (response && response.length > 0) {
      response.forEach((Pet) => {
        Requests.find({ PetID: Pet.PetID }).then((response) => {
          res.status(200).send({ status: "success", Requests: response[0] });
        });
      });
    } else {
      res
        .status(200)
        .send({ status: "success", Requests: "No requests found" });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

module.exports = {
  getPets,
  addPet,
  updatePet,
  deletePet,
  getPetByPetID,
  getPetsByUserID,
  requestPet,
  deleteRequest,
  getRequestsByPetID,
  getRequestByUserID,
  getRequestsByRescuerID,
  adoptPet,
};
