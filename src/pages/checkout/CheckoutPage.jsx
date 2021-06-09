import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import "./CheckoutPage.scss";
import StripeButton from "../../components/stripe-button/StripeButton";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cartItems, totalPrice }) => {
  return (
    <div className="checkout-page">
      {totalPrice <= 0 ? (
        <>
          <h1>Your cart is empty</h1>
          <Link className="shop-button" to="/shop">
            Go to shop!
          </Link>
        </>
      ) : (
        <>
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <div className="total">
            <span>TOTAL: ${totalPrice}</span>
            <StripeButton />
          </div>
          <div className="test-warning">
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: any future date - CVV: 123
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotalPrice,
});

export default connect(mapStateToProps)(CheckoutPage);
