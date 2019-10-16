import axios from 'axios';
import {Fragment} from 'react';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import AddProductToCart from '../components/Product/AddProductToCart';
import baseUrl from "../utils/baseUrl";
function Product({product}) {
  return (
    <Fragment>
      <ProductSummary {...product}/>
      <ProductAttributes {...product}/>
    </Fragment>
  );
}

//destructured from ctx and query to get the _id property
Product.getInitialProps = async ({query: {_id}}) => {
  const url =  `${baseUrl}/api/product`;
  //payload is the same as grabbing it from the query or putting it within the url variable
  const payload = {params: {_id}};
  const response = await axios.get(url, payload);
  return {product: response.data}
};

export default Product;
