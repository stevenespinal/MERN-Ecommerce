import {Input} from 'semantic-ui-react';
import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";
import axios from 'axios';
import baseUrl from "../../utils/baseUrl";
import cookie from 'js-cookie';
import catchErrors from "../../utils/catchErrors";

function AddProductToCart({user, productId}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout;
    if (success) {
     timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [success]);

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = {quantity, productId};
      const token = cookie.get("token");
      const headers = {
        headers: {Authorization: token}
      };
      await axios.put(url, payload, headers);
      setSuccess(true)
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={
        user && success ? {
            color: "blue",
            content: "Item Added!",
            icon: "plus cart",
            disabled: true
          } :
          user ? {
            color: 'red',
            content: "Add to Cart",
            loading,
            disabled: loading,
            icon: "plus cart",
            onClick: handleAddProductToCart
          } : {
            color: 'blue',
            content: 'Sign Up to purchase',
            icon: "signup",
            onClick: () => router.push("/signup")
          }}
    />
  );
}

export default AddProductToCart;