const express = require("express");
const invoiceRoute = express.Router();
const { authenticate } = require("../middleware/userAuthentication");
const {createInvoice, getInvoiceDetail} = require("../controller/invoiceController");


{/**
    endpoint - "v1/create/invoice" this is invoice endpoint through we crerate invoice
    */}
   //nvoiceRoute.post("/test");
invoiceRoute.post("/v1/create/invoice", authenticate , createInvoice);

{/**
    endpoint - "v1/read/invoice" this is from we read the invoice create by user
    */}
invoiceRoute.get("/v1/read/invoice", getInvoiceDetail);

module.exports = invoiceRoute;