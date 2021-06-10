import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { WithSpinner } from "../../components/with-spinner/WithSpinner.jsx";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
  const [isLoading, setISLoading] = useState(true);
  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        console.log(snapshot);
        const collectionsMap = await convertCollectionSnapshotToMap(snapshot);

        updateCollections(collectionsMap);
        setISLoading(false);
        return await unsubscribeFromSnapshot;
      }
    );
  });

  console.log(match);

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={isLoading} {...props} />
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
