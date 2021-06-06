import React, { useState } from "react";

import SHOP_DATA from "./Shop.data";

import PreviewCollection from "../../components/preview-collection/PreviewCollection";
const ShopPage = () => {
  const [collections, setCollections] = useState(SHOP_DATA);
  return (
    <div>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <PreviewCollection key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default ShopPage;
