const invoice = require("../schema/invoiceSchema");
const zo = require("zod");

const invoiceSchema = zo.object({
  user_id: zo.object({
    user_id: zo.string(),
  }),
  businessDetail: zo.object({
    businessName: zo.string(),
    address: zo.string(),
    gst: zo.string(),
    contact: zo.string().regex(/^\+?[0-9\s-]{10,15}$/, {
      message: "only number allowed",
    }),

    email: zo.string().email({
      message: "Please enter valid email formate",
    }),
  }),

  customerDetail: zo.object({
    address: zo.string(),
    customerName: zo.string(),
    gst: zo.string(),
    contact: zo.string().regex(/^\+?[0-9\s-]{10,15}$/, {
      message: "only number allowed",
    }),
    email: zo.string().email({
      message: "Please enter valid email formate",
    }),
  }),
  invoice: zo.object({
    invoiceNumber: zo.string(),
    invoicedate: zo.string(),
    dueDate: zo.string(),
  }),
  product: zo.object({
    productName: zo.string(),
    quantity: zo.string(),
    perUnit: zo.string(),
    totalprice: zo.string(),
  }),
  taxDetail: zo.object({
    gst: zo.string(),
    taxPercentage: zo.string(),
    totalTax: zo.string(),
  }),
  payment: zo.object({
    bankdetail: zo.string(),
    paymentMethod: zo.string(),
  }),
  totalprice: zo.object({
    subtotal: zo.string(),
    afterTax: zo.string(),
    discount: zo.string(),
  }),
});
async function createInvoice(req, res) {
  try {
    const invoiceBody = req.body;
    const validate = invoiceSchema.parse(invoiceBody);
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
      message: "Invoice not found",
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
