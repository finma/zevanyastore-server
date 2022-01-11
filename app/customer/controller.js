import Payment from "../payment/model";
import Product from "../product/model";
import Transaction from "../transaction/model";

export const createTransaction = async (req, res) => {
  try {
    const { productID, paymentID, totalItem, totalPrice, address } = req.body;

    const product = await Product.findOne({ _id: productID });

    if (!product) {
      return res.status(404).json({ error: 1, message: "Product not found!" });
    }

    const payment = await Payment.findOne({ _id: paymentID });

    if (!payment) {
      return res.status(404).json({ error: 1, message: "Payment not found!" });
    }

    const payload = {
      historyProduct: {
        name: product._doc.name,
        category: product._doc.category,
        stock: product._doc.stock,
        price: product._doc.price,
        description: product._doc.description,
        image: product._doc.image,
      },
      historyPayment: {
        name: payment._doc.name,
        type: payment._doc.type,
        bankName: payment._doc.bankName,
        noRekening: payment._doc.noRekening,
      },
      historyCustomer: {
        customerId: req.customer._id,
        name: req.customer.name,
      },
      historyAddress: {
        address: address.address,
        city: address.city,
        postcode: address.postcode,
        province: address.province,
      },
      totalPrice,
      totalItem,
      customer: req.customer._id,
    };

    const transaction = await Transaction(payload);

    await transaction.save();

    res
      .status(201)
      .json({ error: 0, message: "checkout success", data: payload });
  } catch (error) {
    res
      .status(500)
      .json({ error: 1, message: error.message || "Internal server error" });
  }
};
