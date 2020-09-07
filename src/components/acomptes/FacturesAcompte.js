import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import AcompteListDataTable from './AcompteListDataTable.js';
import Spinner from '../layout/Spinner.js';
import SendAcompteModal from './SendAcompteModal.js';
import {
  updateAcompteStatut,
  supprimerAcompte,
} from '../../store/actions/acompteActions.js';
import { clearFactureState } from '../../store/actions/alertActions.js';
//import axios from 'axios';
//import moment from 'moment';
import EnregistrerAcomptePayerModal from './EnregistrerAcomptePayerModal.js';
import SupprimerAcompteModal from './SupprimerAcompteModal.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Alert from '../layout/Alert.js';
import { saveAs } from 'file-saver';

const $ = require('jquery');

class FacturesAcompte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      acompte: null,
      refAcompte: null,
      openEnregAcomptePayeModal: false,
      openSupprimerAcompteModal: false,
      resMessageFromGenerateAcomptePdfPostReq: '',
      messageType: 'error',
    };
  }
  acompteAsupprimerSetState = (open, acompte) => {
    this.setState({
      openSupprimerAcompteModal: open,
      acompte,
    });
  };
  selectEnregistrerAcomptePaye = (open, acompte) => {
    this.setState({ openEnregAcomptePayeModal: open, acompte });
  };
  enregistrerAcomptePayeDataBase = (acompte, statutAcompte) => {
    const { updateAcompteStatut, clearFactureState } = this.props;
    updateAcompteStatut(acompte, statutAcompte);
    this.setState({ openEnregAcomptePayeModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 5000);
    //return <Redirect to="/" />;
  };

  supprimerAcompteDataBase = (acompte) => {
    const { supprimerAcompteDataBase, clearFactureState } = this.props;
    supprimerAcompteDataBase(acompte);
    this.setState({ openSupprimerAcompteModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 5000);
  };
  createAndDownloadAcomptePDF = (acompte) => {
    axios
      .post('/generateAcomptePdf', {
        ...acompte,
        dateAcompte: moment(acompte.dateAcompte.toDate()).format('D-MM-YYYY'),
        dateValiditeAcompte: moment(
          acompte.dateValiditeAcompte.toDate()
        ).format('D-MM-YYYY'),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
      })
      .then((res) => {
        console.log('bonjourna');
        console.log(res.data);
        //console.log(res.data);
        alert(res.data);
        return axios.get('/fetch-acompte-pdf', { responseType: 'blob' });
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'acompte.pdf');
      })
      .catch((err) => {
        alert(
          `Erreur survenue lors de la génération et du téléchargement de la facture d\'acompte au format PDF, ${err.message}`
        );
      });
  };
  updateState = (open, acompte) => {
    console.log(this.state.open);
    this.setState({ open, acompte, refAcompte: null });
    console.log(this.state.open);
    axios
      .post('/generateAcomptePdf', {
        ...acompte,
        dateAcompte: moment(acompte.dateAcompte.toDate()).format('D-MM-YYYY'),
        dateValiditeAcompte: moment(
          acompte.dateValiditeAcompte.toDate()
        ).format('D-MM-YYYY'),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
      })
      .then((res) => {
        alert(res.data);
        return axios.get('/fetch-acompte-png');
      })
      .then((res) => {
        this.setState({ refAcompte: res.data }, () =>
          console.log(this.state.refAcompte)
        );
      })
      .catch((err) => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
        alert(
          "Erreur survenue lors de la génération de l'acompte\n" + err.message
        );
        //alert(err.message + '\nle serveur Node.js ne fonctionne pas !');
        /* this.setState({
          resMessageFromGenerateAcomptePdfPostReq:
            err.message + '\nle serveur Node.js ne fonctionne pas !',
          messageType: 'error',
        }); */
      });
  };
  /* handleOnClickOuvrirAcompte = acompte => {
    if (acompte.acompteStatut !== 'payee') {
      this.props.history.push('/acompte/' + acompte.id);
    }
  }; */

  handleModal = (data) => {
    this.setState({ open: data });
  };

  render() {
    console.log(this.props);
    const { acomptes, facture, acompteMessage, messageType } = this.props;
    var modal = this.state.acompte ? (
      <SendAcompteModal
        show={this.state.open}
        onHide={() => this.handleModal(false)}
        acompte={this.state.acompte}
        refAcompte={this.state.refAcompte}
      />
    ) : null;
    console.log(this.state.acomptes);
    if (acomptes) {
      return (
        <React.Fragment>
          {acompteMessage ? (
            <Alert message={acompteMessage} messageType={messageType} />
          ) : null}
          {/*  {acompteMessage ? (
            messageType === 'success' ? (
              <div
                class="alert alert-success alert-dismissible fade show"
                //style={{ left: '40%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Success! </strong>
                {acompteMessage}.
              </div>
            ) : (
              <div
                class="alert alert-danger alert-dismissible fade show"
                //style={{ left: '50%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Error! </strong> {acompteMessage}.
              </div>
            )
          ) : null} */}
          <h2>
            Factures d'acompte de la facture n°
            {facture ? facture.numFacture : null}
          </h2>
          <h2>
            <Link
              to={
                '/facturesAcompte/facture/' +
                this.props.match.params.id +
                '/new'
              }
            >
              <button className="btn btn-primary my-2">
                Nouvelle facture d'acompte
              </button>
            </Link>
          </h2>
          <div className="row margin-top">
            <AcompteListDataTable
              acomptes={acomptes}
              updateState={this.updateState}
              selectEnregistrerAcomptePaye={this.selectEnregistrerAcomptePaye}
              acompteAsupprimerSetState={this.acompteAsupprimerSetState}
              createAndDownloadAcomptePDF={this.createAndDownloadAcomptePDF}
              //handleOnClickOuvrirAcompte={this.handleOnClickOuvrirAcompte}
            />
            {/* <SendAcompteModal
              show={this.state.open}
              onHide={() => this.handleModal(false)}
              acompte={this.props.acomptes[0]}
              refAcompte={this.state.refAcompte}
            /> */}
            {modal}
            <EnregistrerAcomptePayerModal
              show={this.state.openEnregAcomptePayeModal}
              onHide={() => this.setState({ openEnregAcomptePayeModal: false })}
              enregistrerAcomptePayeDataBase={() =>
                this.enregistrerAcomptePayeDataBase(this.state.acompte, 'payee')
              }
            />
            <SupprimerAcompteModal
              show={this.state.openSupprimerAcompteModal}
              onHide={() => this.setState({ openSupprimerAcompteModal: false })}
              supprimerAcompteDataBase={() =>
                this.supprimerAcompteDataBase(this.state.acompte)
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
    updateAcompteStatut: (acompte, acompteStatut) =>
      dispatch(updateAcompteStatut(acompte, acompteStatut)),
    supprimerAcompteDataBase: (acompte) => dispatch(supprimerAcompte(acompte)),
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
    facture:
      state.firestore.ordered.facture && state.firestore.ordered.facture[0],
    acomptes: state.firestore.ordered.acomptes,
    acompteMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'acomptes',
        where: [['factureId', '==', props.match.params.id]],
      },
      {
        collection: 'factures2',
        storeAs: 'facture',
        doc: props.match.params.id,
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }];
  })
)(FacturesAcompte);
