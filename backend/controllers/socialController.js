const { Pet } = require("../models/schemas/petSchema");
const { Social } = require("../models/schemas/socialSchema");
const { User } = require("../models/schemas/userSchema");

const get = async (req, res) => {};

const updateLikes = async (req, res) => {};

const updateComments = async (req, res) => {};

const getSocial = async (req, res) => {
  const petId = req.params.PetID;
  var socialList = await Social.find({ petId: petId }).populate({
    path: "author",
  });
  console.log(socialList);
  res.status(200).send(socialList);
};

const updateSocial = async (req, res) => {
  const pid = req.body.SocialData.PetID;
  console.log(req.body.SocialData);
  var user = await User.findOne({ userId: req.body.SocialData.author });
  var pet = await Pet.findOne({ PetID: pid });
  const newSocial = await Social.find({ petId: pid });
  var newS = {};
  console.log("Check", newSocial.length);

  if (newSocial.length <= 0) {
    console.log("IN 1st");
    newS = {
      petId: pid,
      likes: [req.body.SocialData.likes],
      comments: req.body.SocialData.comment,
      author: user._id,
    };
  } else {
    console.log("IN 2nd");
    newS = {
      petId: pid,
      comments: req.body.SocialData.comment,
      author: user._id,
      likes: [
        ...newSocial[newSocial.length - 1].likes,
        req.body.SocialData.likes,
      ],
    };
  }

  const Activity = new Social(newS);
  pet.social.push(Activity);
  await Activity.save();
  await pet.save();
  res.status(200).send(pet);
};

module.exports = { get, getSocial, updateLikes, updateComments, updateSocial };
