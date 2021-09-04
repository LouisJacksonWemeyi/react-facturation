import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import DevisListDataTable from './DevisListDataTable.js';
import Spinner from '../layout/Spinner.js';
import SendDevisModal from './SendDevisModal';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EnregistreDevisAccepteModal from './EnregistreDevisAccepteModal.js';
import SupprimerDevisModal from './SupprimerDevisModal.js';
import {
  updateDevisStatut,
  supprimerDevis,
} from '../../store/actions/devisActions.js';
import { clearFactureState } from '../../store/actions/alertActions.js';
import Alert from '../layout/Alert.js';
import { saveAs } from 'file-saver';

const $ = require('jquery');

class Devis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      devis: null,
      refDevis: null,
      openEnregDevAccepteModal: false,
      openSupprimerDevisModal: false,
      facturesLieesDevisAsupprimer: [],
      resMessageFromGenerateDevisPdfPostReq: '',
      messageType: '',
    };
  }
  selectEnregistreDevisAccepte = (open, devis) => {
    this.setState({ openEnregDevAccepteModal: open, devis });
  };
  createAndDownloadDevisPDF = (devis) => {
    axios
      .post('/generateDevisPdf', {
        ...devis,
        dateDevis: moment(devis.dateDevis.toDate()).format('D-MM-YYYY'),
        dateValiditeDevis: moment(devis.dateValiditeDevis.toDate()).format(
          'D-MM-YYYY'
        ),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
      })
      .then((res) => {
        console.log('bonjourna');
        console.log(res.data);
        //console.log(res.data);
        alert(res.data);
        return axios.get('fetch-devis-pdf', { responseType: 'blob' });
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'devis.pdf');
      })
      .catch((err) => {
        alert(
          `Erreur survenue lors de la génération et du téléchargement du devis au format PDF, ${err.message}`
        );
      });
  };
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
        companyLogo: this.props.companyLogo[0].value.downloadURL,
      })
      .then((res) => {
        alert(res.data);
        return axios.get('fetch-devis-png');
      })
      .then((res) => {
        this.setState({ refDevis: res.data }, () =>
          console.log(this.state.refDevis)
        );
      })
      .catch((err) => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
        alert('Erreur survenue lors de la génération du devis\n' + err.message);
        /* this.setState({
          resMessageFromGenerateDevisPdfPostReq:
            err.message + "\nle serveur Node.js ne fonctionne pas!",
          messageType: 'error',
        }); */
      });
  };
  /* handleOnClickOuvrirDevis = (devis) => {
    if (devis.devisStatut !== 'Facture') {
      this.props.history.push('/devis/' + devis.id);
    }
  }; */
  handleModal = (data) => {
    this.setState({ open: data });
  };
  supprimerDevisDataBase = (devis) => {
    const { supprimerDevisDataBase, clearFactureState } = this.props;
    supprimerDevisDataBase(devis);
    this.setState({ openSupprimerDevisModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 2000);
  };
  devisAsupprimerSetState = (open, devis) => {
    const { factures } = this.props;
    const facturesLieesDevisAsupprimer = factures
      ? factures.filter((facture) => facture.devisId == devis.id)
      : [];
    this.setState({
      openSupprimerDevisModal: open,
      facturesLieesDevisAsupprimer,
      devis,
    });
  };
  enregistreDevisAccepteDataBase = (devis, statutDevis) => {
    const { updateDevisStatut, clearFactureState } = this.props;
    updateDevisStatut(devis, statutDevis);
    this.setState({ openEnregDevAccepteModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 2000);
    //this.props.history.push('/devis');
  };

  render() {
    console.log(this.props);
    const { factureMessage, messageType, devis } = this.props;

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
          {factureMessage ? (
            <Alert message={factureMessage} messageType={messageType} />
          ) : null}
          {/* {factureMessage ? (
            messageType === 'success' ? (
              <div
                class="alert alert-success alert-dismissible fade show"
                //style={{ left: '40%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Success! </strong>
                {factureMessage}.
              </div>
            ) : (
              <div
                class="alert alert-danger alert-dismissible fade show"
                //style={{ left: '50%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Error! </strong> {factureMessage}.
              </div>
            )
          ) : null} */}
          <h2>Devis</h2>
          <h2>
            <Link to={'/devis/new'}>
              <button className="btn btn-primary my-2">Nouveau Devis</button>
            </Link>
          </h2>
          <div className="row margin-top">
            <DevisListDataTable
              devis={devis}
              updateState={this.updateState}
              //handleOnClickOuvrirDevis={this.handleOnClickOuvrirDevis}
              selectEnregistreDevisAccepte={this.selectEnregistreDevisAccepte}
              devisAsupprimerSetState={this.devisAsupprimerSetState}
              createAndDownloadDevisPDF={this.createAndDownloadDevisPDF}
            />
            {modal}
            <EnregistreDevisAccepteModal
              show={this.state.openEnregDevAccepteModal}
              onHide={() => this.setState({ openEnregDevAccepteModal: false })}
              enregistreDevisAccepteDataBase={() =>
                this.enregistreDevisAccepteDataBase(this.state.devis, 'accepte')
              }
            />
            <SupprimerDevisModal
              show={this.state.openSupprimerDevisModal}
              onHide={() => this.setState({ openSupprimerDevisModal: false })}
              facturesLieesDevisAsupprimer={
                this.state.facturesLieesDevisAsupprimer
              }
              supprimerDevisDataBase={() =>
                this.supprimerDevisDataBase(this.state.devis)
              }
            />
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateDevisStatut: (devis, devisStatut) =>
      dispatch(updateDevisStatut(devis, devisStatut)),
    supprimerDevisDataBase: (devis) => dispatch(supprimerDevis(devis)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  const auth = state.firebase.auth;
  return {
    auth: auth,
    companyLogo: state.firebase.ordered && state.firebase.ordered[auth.uid],
    companyData: state.firebase.profile.companyData,
    devis: state.firestore.ordered.devis,
    factures: state.firestore.ordered.factures2,
    factureMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'devis', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'factures2', where: [['authorId', '==', props.auth.uid]] },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }];
  })
)(Devis);
