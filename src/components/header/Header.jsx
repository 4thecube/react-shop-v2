import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";

import CartIcon from "../cart-icon/CartIcon";

import "./Header.scss";
import { ReactComponent as Logo } from "./crown.svg";
import userIcon from "../../assets/user.svg";

const Header = ({ currentUser, isHidden, signOutStart }) => {
  console.log(currentUser);
  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <div className="option">
          {currentUser && (
            <div className="user">
              <img className="user-icon" alt="user icon" src={userIcon} />
              <span className="user-name">
                {currentUser.displayName.toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/about" className="option">
          ABOUT
        </Link>
        {currentUser ? (
          <div className="option" onClick={signOutStart}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {!isHidden ? <CartDropdown /> : null}
    </div>
  );
};

const mapStateToProps = (state) =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
    isHidden: selectCartHidden,
  });

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
