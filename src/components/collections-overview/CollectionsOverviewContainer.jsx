import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";
import { WithSpinner } from "../with-spinner/WithSpinner.jsx";
import CollectionsOverview from "./CollectionsOverview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
