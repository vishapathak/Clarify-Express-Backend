const invoice = require("../schema/invoiceSchema");
const zo = require('zod');

const invoiceSchema = zo.object({
   businessDetail:  zo.object({
    businessName: zo.string(),
    address:zo.string(),
    gst:zo.string(),
    contact: zo.string().regex(/^\+?[0-9\s-]{10,15}$/,{
        message:"only number allowed",
    }),

    email: zo.string().email({
        message:"Please enter valid email formate",
    })
   }),


    customerDetail: zo.object({
        address: zo.string(),
        customerName:zo.string(),
        gst:zo.string(),
        contact:zo.string().regex(/^\+?[0-9\s-]{10,15}$/,{
        message:"only number allowed",
    }),
    email:zo.string().email({
        message:"Please enter valid email formate",
    })
    }),
    invoice: zo.object({
        invoiceNumber: zo.string(),
        invoicedate: zo.string(),
        dueDate: zo.string()
    }),
    product: zo.object({
        productName: zo.string(),
        quantity:zo.string(),
        perUnit: zo.string(),
        totalprice: zo.string()
    }),
    taxDetail: zo.object({
        gst: zo.string(),
        taxPercentage: zo.string(),
        totalTax: zo.string()
    }),
    payment: zo.object({
        bankdetail:zo.string(),
        paymentMethod:zo.string()
    }),
    totalprice: zo.object({
        subtotal: zo.string(),
        afterTax:zo.string(),
        discount:zo.string()
    })
})
async function createInvoice (req,res){
try {
    const invoiceBody = req.body;
    const validate = invoiceSchema.parse(invoiceBody);
    const Invoice = await invoice. create(validate);

    res.status(201).json({
        data : Invoice,
        message: "create successfully",
    })
} catch (error) {
    res.status(500).json({
        message:"error in creating invoice",
        error,
    })
}
}
    
module.exports ={createInvoice};
