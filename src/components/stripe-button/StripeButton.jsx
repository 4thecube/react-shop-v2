import { TokenType } from "acorn";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./StripeButton.scss";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51ICk51DAJF6NPa7pUFBuhJwgRINR9fGdMbiFqrSlnFhTCGCdZVGf3Aep8h0BU4uOaeWTO9zzwyFLGHRvZNp5Lg6u00pWxZ0L8H";

  const onToken = (token) => {
    console.log(token);

    alert("Tnx for money", TokenType);
  };
  return (
    <StripeCheckout
      className="check-out-button"
      label="PAY NOW"
      name="Sraka and Co Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Money, money, money"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
