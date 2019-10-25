import Stripe from "stripe";
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import Cart from "../../models/Cart"
import calculateCartTotal from "../../utils/calculateCartTotal";
import Order from "../../models/Order";


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
  const {paymentData} = req.body;

  try {
    //  verify and get user id from token
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    //  find cart based on user id and populate it
    const cart = await Cart.findOne({user: userId}).populate({
      path: "products.product",
      model: "Product"
    });
    //  calculate cart totals again from cart products
    const {cartTotal, stripeTotal} = calculateCartTotal(cart.products);
    //  get email from payment data and see if email is linked with existing stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      // only one customer will be returned to us
      limit: 1
    });
    //  otherwise create them based on their email credentials
    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;

    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }

    const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    //  create charge with total, send receipt email

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: stripeTotal,
      receipt_email: paymentData.email,
      customer,
      description: `Checkout | ${paymentData.email} | ${paymentData.id}`
    }, {
      //make sure charge isn't implemented twice this is done by using uuid to generate a unique string
      idempotency_key: uuidv4()
    });

    //  add order data to db

    const order = await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products
    }).save();
    //  clear products in cart
    await Cart.findOneAndUpdate({
      _id: cart._id
    }, {
      $set: {products: []}
    });
    //  send back a success 200 response
    res.status(200).send("Checkout successful")
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing charge.")
  }
}