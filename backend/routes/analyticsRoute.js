const express = require("express");
const routes = express.Router();

const { getMetrics } = require("../controllers/analyticsController");

routes.get("/metrics", getMetrics);

module.exports = routes;
