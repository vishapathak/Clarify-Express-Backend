const zo = require("zod");

const AllSchema = zo.object({
  user_id: zo.object({
    user_id: zo.string(),
  }),
  businessDetail: zo.object({
    businessName: zo.string(),
    address: zo.string(),
    gstNumber: zo.string().optional(),
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
    contact: zo.string().regex(/^\+?[0-9\s-]{10,15}$/, {
      message: "only number allowed",
    }),
    email: zo.string().email({
      message: "Please enter valid email formate",
    }),
  }),
 
  product: zo.object({
    productName: zo.string(),
    quantity: zo.string(),
    perUnit: zo.string(),
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
module.exports = { AllSchema };
