const zo = require("zod");
const quatation = require("../schema/quatationSchema");
const { AllSchema} = require("../utils/validation");
const quatationValidateSchema = AllSchema.extend({
        quatation: zo.object({
        quatationNumber: zo.string(),
        quatationDate: zo.string(),
}),
signature: zo.string(),
conditions:zo.string(),
})

async function createQuatation(req, res){
    try {
        const quatationBody = req.body;
        const validate = quatationValidateSchema.parse(quatationBody);
        const quatation = await quatation.create(validate);
        res.status(201).json({
            error: false,
            success: true,
            data : quatation,
            message: "Quatation is created successfully",
        })
    } catch (error) {
            res.status(500).json({
            error: false,
            success: true,
            message: "Error while creating a Quatation",
            error,
        })
    }
}

async function getQuatationDetail(req, res) {
  const quatationId = req.query.id;
  if (!quatationId) {
    return res.status(404).json({
      error: true,
      success: false,
      message: "QuatationID not found",
    });
  }
  const Quatation = await quatation.findById(invoiceId);
  if (!Quatation) {
    return res.status(404).json({
      error: true,
      success: false,
      message: "Quatation not found",
    });
  }
  res.status(200).json({
    success: true,
    error: false,
    message: "Quatation found successfully",
    data: Invoice,
  });
}


module.exports = { createQuatation,  getQuatationDetail }