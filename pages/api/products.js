import products from '../../static/products.json';

export default (req, res) => {
  res.status(200).json(products)
}
