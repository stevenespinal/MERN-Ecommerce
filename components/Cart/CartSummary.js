import React, {Fragment, useState, useEffect} from 'react';
import {Button, Segment, Divider} from 'semantic-ui-react';
import calculateCartTotal from "../../utils/calculateCartTotal";
import StripeCheckout from "react-stripe-checkout";

function CartSummary({products, handleCheckout, success}) {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    const {cartTotal, stripeTotal} = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);
  return (
    <Fragment>
      <Divider/>
      <Segment clearing size="large">
        <strong>Sub Total:</strong> ${cartAmount}
        <StripeCheckout
          name="React E-commerce"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_Kzq2cNmcle5KbmLqwAyZQatc00DDdIMax7"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            disabled={isCartEmpty || success}
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </Fragment>
  );
}

export default CartSummary;
