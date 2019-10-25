function calculateCartTotal(products) {
  // 0 is the default accumulator value for this function specifically
  const total = products.reduce((acc, el) => {
    //loops over and runs the block of code on the right until acc is at the max value
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);

  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return {cartTotal, stripeTotal};
}

export default calculateCartTotal;