const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const {
  getPets,
  addPet,
  getPetByPetID,
  getPetsByUserID,
  requestPet,
  deleteRequest,
  getRequestsByPetID,
  getRequestByUserID,
  getRequestsByRescuerID,
  adoptPet,
} = require("../controllers/petController");
const { uploadImages } = require("../controllers/fileUpload");

const routes = express.Router();

// upload images to memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Pet
routes.get("/", getPets);
routes.get("/pet/:PetID", getPetByPetID);
routes.get("/user/:UserID", getPetsByUserID);
routes.get("/requests/pet/:PetID", getRequestsByPetID);
routes.get("/requests/user/:UserID", getRequestByUserID);
routes.get("/requests/rescuer/:RescuerID", getRequestsByRescuerID);
routes.post("/addpet", addPet);
routes.post("/requestpet", requestPet);
routes.post("/deleterequest", deleteRequest);
routes.post("/adopt", adoptPet);

// AWS
routes.post("/upload", upload.array("files"), uploadImages);

module.exports = routes;
