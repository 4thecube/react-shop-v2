import { takeLatest, takeEvery, call, put, all } from "redux-saga/effects";

import { ShopActionTypes } from "./shop.types";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    yield console.log("I am fired");
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    // first arg - function, sec - params to function
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    // put acting like dispatch in redux-thunk
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
