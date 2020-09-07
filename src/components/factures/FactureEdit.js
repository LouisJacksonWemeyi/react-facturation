import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const FactureEdit = props => {
  return <div>FactureEdit</div>;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    factures: state.firestore.ordered.factures
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'factures' }])
)(FactureEdit);

//export default FactureEdit;
