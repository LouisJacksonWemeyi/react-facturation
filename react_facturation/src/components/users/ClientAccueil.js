import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ClientAccueilDataTableNew from './ClientAccueilDataTableNew.js';
import Spinner from '../layout/Spinner';

class ClientAccueil extends Component {
  render() {
    const { factures, acomptes, devis } = this.props;
    if (factures && acomptes && devis) {
      return (
        <ClientAccueilDataTableNew
          factures={factures}
          acomptes={acomptes}
          devis={devis}
        />
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase && state.firebase.auth,
    factures: state.firestore.ordered && state.firestore.ordered.factures2,
    acomptes: state.firestore.ordered && state.firestore.ordered.acomptes,
    devis: state.firestore.ordered && state.firestore.ordered.devis,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'factures2',
        where: [['client.emailClient', '==', props.auth.email]],
      },
      {
        collection: 'acomptes',
        where: [['client.emailClient', '==', props.auth.email]],
      },
      {
        collection: 'devis',
        where: [['client.emailClient', '==', props.auth.email]],
      },
    ];
  })
)(ClientAccueil);
