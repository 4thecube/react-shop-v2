import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop) => shop.shopItems
);

// nihuya ne ponyav, ale duzhe cikavo
export const selectCollectionsForPreview = createSelector(
  [selectShopItems],
  (collections) => Object.keys(collections).map((key) => collections[key])
);
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectShopItems], (collections) => {
    return collections.find((collection) => {
      return collection.routeName === collectionUrlParam;
    });
  });
