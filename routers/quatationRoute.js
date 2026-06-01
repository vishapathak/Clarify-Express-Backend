const express = require("express");
const quatationRoutes = express.Router();
const { authenticate } = require("../middleware/userAuthentication");
const { createQuatation,  getQuatationDetail} = require("../controller/quatationController")

{/**
    endpoint - /v1/create/quatation , through which we create quatation
    */}
quatationRoutes.post("/v1/create/quatation", createQuatation)


{/**
    endpoint - /v1/getQuatationInfo/quatation , through which we get quatation detail
    */}
quatationRoutes.get("/v1/getQuatationInfo/quatation",getQuatationDetail )

module.exports = quatationRoutes;
