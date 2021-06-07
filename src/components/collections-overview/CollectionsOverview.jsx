import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PreviewCollection from "../preview-collection/PreviewCollection";
import { selectShopItems } from "../../redux/shop/shop.selectors";

import "./CollectionsOverview.scss";

const CollectionsOverview = ({ shopItems }) => {
  return (
    <div className="collections-overview">
      {shopItems.map(({ id, ...otherCollectionProps }) => (
        <PreviewCollection key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shopItems: selectShopItems,
});

export default connect(mapStateToProps)(CollectionsOverview);
