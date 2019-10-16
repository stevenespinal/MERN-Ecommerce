import Product from '../../models/Product';

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      //405 no method provided
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
}

async function handleGetRequest(req, res) {
  const {_id} = req.query;
  const product = await Product.findOne({_id});
  res.status(200).json(product);
}


async function handleDeleteRequest(req, res) {
  const {_id} = req.query;
  const product = await Product.findOneAndDelete({_id});
  //204 no content
  res.status(204).json({});
}
