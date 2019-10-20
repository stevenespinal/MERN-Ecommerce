import React, {Fragment} from 'react';
import {Button, Segment, Divider} from 'semantic-ui-react';

function CartSummary() {
  return (
    <Fragment>
      <Divider/>
      <Segment clearing size="large">
        <strong>Sub Total:</strong> $0.00
        <Button icon="cart" color="teal" floated="right" content="Checkout"/>
      </Segment>
    </Fragment>
  );
}

export default CartSummary;
