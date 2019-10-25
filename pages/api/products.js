// import products from '../../static/products.json';
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

//async/await promises saves a lot of code
//allows you to store the data retrieved from the
//db and store it into a products variable
//then you just send the okay status and return json
//with the products
export default async (req, res) => {
  const {page, size} = req.query;
  // convert query string to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs/pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }
  // const products = await Product.find();
  res.status(200).json({products, totalPages});
}
