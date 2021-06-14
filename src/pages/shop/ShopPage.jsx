import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { WithSpinner } from "../../components/with-spinner/WithSpinner.jsx";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionsFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors.js";
import CollectionsOverviewContainer from "../../components/collections-overview/CollectionsOverviewContainer.jsx";
import CollectionPageContainer from "../collection/CollectionPageContainer.jsx";

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  match,
  isCollectionsLoaded,
  isCollectionsFetching,
  fetchCollectionsStartAsync,
  fetchCollectionsStart,
}) => {
  //const [isLoading, setISLoading] = useState(true);
  useEffect(() => {
    fetchCollectionsStart();
  }, []);

  console.log(match);

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
