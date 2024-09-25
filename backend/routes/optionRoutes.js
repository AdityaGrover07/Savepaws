const express = require("express");
const routes = express.Router();

const { getBreeds, getStates } = require("../controllers/optionController");

routes.get("/breeds", getBreeds);
routes.get("/states", getStates);

module.exports = routes;
