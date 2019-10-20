import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import {Segment} from 'semantic-ui-react';

function Cart() {
  return (
    <Segment>
      <CartItemList/>
      <CartSummary/>
    </Segment>
  );
}

export default Cart;
