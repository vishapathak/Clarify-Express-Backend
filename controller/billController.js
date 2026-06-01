const zo = require("zod");
const bill = require("../schema/billSchema");
const { AllSchema } = require("../utils/validation");
const billValidateSchema = AllSchema.extend({
  bill: zo.object({
    billNumber: zo.string(),
    billDate: zo.string(),
  }),
});

async function createbill(req, res) {
  try {
    const billBody = req.body;
    const validate = billValidateSchema.parse(billBody);
    const Bill = await bill.create(validate);

    res.status(201).json({
      data: Bill,
      message: "Create successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in generating bill",
      error,
    });
  }
}

async function getBillDetail(req, res) {
  try {
    const billID = req.query.id;
    console.log(billID, "bill id yeh hai");
    if (!billID) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Bill id not found",
      });
    }
    const Bill = await bill.findById(billID);
    if (!Bill) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Bill not matched ",
      });
    }
    res.status(200).json({
      error: false,
      success: true,
      message: "Bill found Successfully",
      data: Bill,
    });
  } catch (error) {
    sres.status(500).json({
      message: "Error in generating bill",
      error,
    });
  }
}
module.exports = { createbill, getBillDetail };
