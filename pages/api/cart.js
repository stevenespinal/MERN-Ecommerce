import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

const {ObjectId} = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} is not allowed`)
  }
}


async function handleGetRequest(req, res) {
  // if (!("authorization" in req.headers)) {
  //
  // }
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }

  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const cart = await Cart.findOne({user: userId}).populate({
      path: "products.product",
      model: "Product"
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again.")
  }
}


async function handlePutRequest(req, res) {
  const {quantity, productId} = req.body;
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    //  get user cart based on userId
    const cart = await Cart.findOne({user: userId});
    //check if product exists already in user cart
    const productExists = cart.products.some(doc => ObjectId(productId).equals(doc.product));
    //  if so increment quantity provided by req
    if (productExists) {
      await Cart.findOneAndUpdate({
        _id: cart._id,
        "products.product": productId
      }, {$inc: {"products.$.quantity": quantity}});
    } else {
      //  else add new product with given quantity
      const newProduct = {quantity, product: productId};
      await Cart.findOneAndUpdate({_id: cart._id}, {$addToSet: {products: newProduct}});
    }
    res.status(200).send("Cart updated successfully")
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again.")
  }
}