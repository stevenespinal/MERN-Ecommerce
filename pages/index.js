import React, {useEffect, Fragment} from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';
import baseUrl from '../utils/baseUrl';

function Home({products, totalPages}) {
  //interact with api and outside functionality
  // console.log(products);
  //second argument is dependencies that determine what the function runs
  // doing the following below is fetching the api from products on the client side
  // useEffect(() => {
  //   getProducts();
  // }, []);
  //
  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products';
  //   const response = await axios.get(url);
  //   console.log(respo,nse.data)
  // }

  return (
    <Fragment>
      <ProductList products={products}/>
      <ProductPagination totalPages={totalPages}/>
    </Fragment>
  );
}


// fetching data this way will fetch the data first on the server side
Home.getInitialProps = async ctx => {
  // console.log(ctx.query);
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  //  fetch data on server
  //  return res data as an object
  const url = `${baseUrl}/api/products`;
  const payload = {
    params: {page, size}
  };
  const response = await axios.get(url, payload);
  return response.data;
//  object will merge with previous / existing props
};

export default Home;
