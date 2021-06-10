import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// nihuya ne ponyav, ale duzhe cikavo
export const selectCollectionsForPreview = createSelector(
  [selectShopItems],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
// export const selectCollection = (collectionUrlParam) =>
//   createSelector([selectShopItems], (collections) => {
//     return collections.find((collection) => {
//       return collection.routeName === collectionUrlParam;
//     });
//   });

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectShopItems], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
