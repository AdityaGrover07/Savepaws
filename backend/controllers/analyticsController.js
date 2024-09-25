const { Pet } = require("../models/schemas/petSchema");
const getMetrics = async (req, res) => {
  let total_no_of_pets;
  let no_of_pets_adopted;
  let no_of_dogs; // Type - 1
  let no_of_cats; // Type - 2
  let others; // Type - 3

  try {
    total_no_of_pets = await Pet.countDocuments();
    no_of_pets_adopted = await Pet.countDocuments({ Status: true });
    no_of_dogs = await Pet.countDocuments({ Type: 1 });
    no_of_cats = await Pet.countDocuments({ Type: 2 });
    others = total_no_of_pets - (no_of_dogs + no_of_cats);

    res.status(200).send({
      metric: [
        total_no_of_pets,
        no_of_pets_adopted,
        no_of_cats,
        no_of_dogs,
        others,
      ],
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getMetrics };
