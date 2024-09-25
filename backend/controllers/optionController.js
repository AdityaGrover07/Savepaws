const breedLabels = require("../dataset/breed_labels.json");
const stateLabels = require("../dataset/state_labels.json");

const getBreeds = async (req, res) => {
  res.send(breedLabels);
};

const getStates = async (req, res) => {
  res.send(stateLabels);
};

module.exports = { getBreeds, getStates };
