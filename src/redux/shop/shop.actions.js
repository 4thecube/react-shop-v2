import { ShopActionTypes } from "./shop.types";
import {
  convertCollectionSnapshotToMap,
  firestore,
} from "../../firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    try {
      const collectionRef = firestore.collection("collections");
      dispatch(fetchCollectionsStart());
      collectionRef.onSnapshot(async (snapshot) => {
        console.log(snapshot);
        const collectionsMap = await convertCollectionSnapshotToMap(snapshot);
        // updateCollections(collectionsMap);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      });
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message));
    }
  };
};
