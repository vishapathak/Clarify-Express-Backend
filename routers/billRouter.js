const express = require("express");
const billRouter = express.Router();

const { authenticate} = require("../middleware/userAuthentication")
const{ createbill, getBillDetail} = require("../controller/billController")

{/**
    endpoint - "/v1/create/bill" this is bill endpoint through we crerate bill
    */}

    billRouter.post("/v1/create/bill",authenticate, createbill);

{/**
    endpoint -"/v1/getBillByUser/bill" this is the bill endpoint where wee get all the bill create by user
    */}

    billRouter.get("/v1/getBillByUser/bill", getBillDetail);

module.exports = billRouter;