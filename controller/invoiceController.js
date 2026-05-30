const zo = require("zod")
const invoice = require("../schema/invoiceSchema");
const { AllSchema} = require("../utils/validation");
const InvoiceValidateSchema = AllSchema.extend({
   invoice: zo.object({
      invoiceNumber: zo.string(),
      invoicedate: zo.string(),
      dueDate: zo.string(),
    }),
})

async function createInvoice(req, res) {
  try {
    const invoiceBody = req.body;
    const validate = InvoiceValidateSchema.parse(invoiceBody);
    const invoiceQuantity = req.body.quantity;
    const Invoice = await invoice.create(validate);

    res.status(201).json({
      data: Invoice,
      message: "Create successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating invoice",
      error,
    });
  }
}

async function getInvoiceDetail(req, res) {
  const invoiceId = req.query.id;
  if (!invoiceId) {
    return res.status(404).json({
      error: true,
      success: false,
      message: "InvoiceID not found",
    });
  }
  const Invoice = await invoice.findById(invoiceId);
  if (!Invoice) {
    return res.status(404).json({
      error: true,
      success: false,
      message: "Invoice not found",
    });
  }
  res.status(200).json({
    success: true,
    error: false,
    message: "Invoice found successfully",
    data: Invoice,
  });
}

module.exports = { createInvoice, getInvoiceDetail };
