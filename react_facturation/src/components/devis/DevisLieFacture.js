import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import DevisListDataTable from './DevisListDataTable.js';
import Spinner from '../layout/Spinner.js';
import SendDevisModal from './SendDevisModal';
import queryString from 'query-string';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class DevisLieFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      devis: null,
      refDevis: null
    };
  }

  updateState = (open, devis) => {
    this.setState({ open, devis, refDevis: null });
    axios
      .post('/generateDevisPdf', {
        ...devis,
        dateDevis: moment(devis.dateDevis.toDate()).format('D-MM-YYYY'),
        dateValiditeDevis: moment(devis.dateValiditeDevis.toDate()).format(
          'D-MM-YYYY'
        ),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL
      })
      .then(res => {
        alert(res.data);
        return axios.get('fetch-devis-png');
      })
      .then(res => {
        this.setState({ refDevis: res.data }, () =>
          console.log(this.state.refDevis)
        );
      })
      .catch(err => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
        alert(err.message);
      });
  };
  handleOnClickOuvrirDevis = devis => {
    if (devis.devisStatut !== 'Facture') {
      this.props.history.push('/devis/' + devis.id);
    }
  };
  handleModal = data => {
    this.setState({ open: data });
  };

  render() {
    console.log(this.props);
    const { devis } = this.props;

    var modal = this.state.devis ? (
      <SendDevisModal
        show={this.state.open}
        onHide={() => this.handleModal(false)}
        devis={this.state.devis}
        refDevis={this.state.refDevis}
      />
    ) : null;
    console.log(this.state.devis);
    if (devis) {
      return (
        <React.Fragment>
          <h2>
            Devis lié à la facture N°
            {queryString.parse(this.props.location.search).numFacture}
          </h2>
          <h2>
            <Link to={'/devis/new'}>
              <button className="btn btn-primary my-2">Nouveau Devis</button>
            </Link>
          </h2>
          <div className="row margin-top">
            <DevisListDataTable
              devis={devis}
              updateState={this.updateState}
              handleOnClickOuvrirDevis={this.handleOnClickOuvrirDevis}
            />
            {modal}
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  const auth = state.firebase.auth;
  return {
    auth: auth,
    companyLogo: state.firebase.ordered && state.firebase.ordered[auth.uid],
    companyData: state.firebase.profile.companyData,
    devis: state.firestore.ordered.devis
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      { collection: 'devis', storeAs: 'devis', doc: props.match.params.id }
    ];
  }),
  firebaseConnect(props => {
    return [{ path: props.auth.uid }];
  })
)(DevisLieFacture);
