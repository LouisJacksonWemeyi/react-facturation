import React, { Component } from 'react';
import FacturesList from '../factures/FacturesList2.js';
//import SignIn from '../auth/SignIn';
import ClientAccueil from '../users/ClientAccueil.js';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

class Dashboard extends Component {
  render() {
    const { profile } = this.props;
    if (profile) {
      if (profile.role === 'pro') {
        return <FacturesList />;
      } else {
        return <ClientAccueil />;
      }
    } else return <Spinner />;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(Dashboard);
