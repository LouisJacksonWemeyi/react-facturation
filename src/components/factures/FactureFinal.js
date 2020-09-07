import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import axios from 'axios';
import moment from 'moment';
import { compose } from 'redux';
import Alert from '../layout/Alert';
import '../../css/facturesCss/factureFinal.css';
import Spinner from '../layout/Spinner';

class FactureFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refFacture: '',
      resMessageFromGenerateFacturePdfPostReq: null,
      messageType: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { acomptes, factureToGenerate, companyLogo } = nextProps;
    const acomptesDeLaFactureAgenerer =
      acomptes &&
      acomptes.map((acompte) => {
        const acompteNew = {
          dateAcompte: moment(acompte.dateAcompte.toDate()).format('D-MM-YYYY'),
          montantAcompte: acompte.montantAcompte,
        };
        return acompteNew;
      });
    console.log(factureToGenerate);
    if (companyLogo) {
      axios
        .post('/generateFacturePdf', {
          ...factureToGenerate,
          dateFacture: moment(
            factureToGenerate && factureToGenerate.dateFacture.toDate()
          ).format('D-MM-YYYY'),
          dateEcheanceFacture: moment(
            factureToGenerate && factureToGenerate.dateEcheanceFacture.toDate()
          ).format('D-MM-YYYY'),
          companyData: this.props.companyData,
          companyLogo: companyLogo[0].value.downloadURL,
          acomptes: acomptesDeLaFactureAgenerer,
        })
        .then((res) => {
          console.log('bonjourna');
          console.log(res.data);
          //console.log(res.data);
          alert(res.data);
          return axios.get('/fetch-facture-png');
        })
        .then((res) => {
          this.setState({ refFacture: res.data }, () =>
            console.log(this.state.refFacture)
          );
        })
        .catch((err) => {
          this.setState({
            resMessageFromGenerateFacturePdfPostReq: `Erreur survenue lors de la génération de la facture, ${err.message}`,
            messageType: 'error',
          });
        });
    }
  }
  render() {
    const {
      refFacture,
      messageType,
      resMessageFromGenerateFacturePdfPostReq,
    } = this.state;
    const { uploadedFiles, factureToGenerate } = this.props;
    if (factureToGenerate) {
      return (
        <React.Fragment>
          {resMessageFromGenerateFacturePdfPostReq ? (
            <Alert
              message={resMessageFromGenerateFacturePdfPostReq}
              messageType={messageType}
            />
          ) : null}
          {/* <div>
            <Link to="/">
              <i class="far fa-arrow-alt-circle-left" /> Factures
            </Link>
          </div> */}
          <div>
            <a href="/">
              <i class="far fa-arrow-alt-circle-left" /> Factures
            </a>
          </div>
          <div>
            <h2>
              Facture n°{factureToGenerate ? factureToGenerate.numFacture : 0}
            </h2>
          </div>
          <div className="invoice-visible-area">
            <div id="printify-preview" style={{ height: '1145px' }}>
              <div
                style={{ overflow: 'hidden', height: '1145px' }}
                className="printify-frame-gutter"
              >
                <iframe
                  style={{
                    display: 'block',
                    overflow: 'hidden',
                    width: '100%',
                    height: '1145px',
                  }}
                  frameBorder="0"
                  scrolling="no"
                  height="0"
                  src={refFacture}
                ></iframe>
              </div>
            </div>
          </div>

          {uploadedFiles &&
            uploadedFiles.map((file, key) => (
              <div
                id="attachments"
                class="invoice-attachments"
                key={file.value.name + key}
              >
                <div class="invoice-attachments">
                  <div class="document-attachment-view">
                    <a
                      data-toggle=""
                      href={file.value.downloadURL}
                      target="_blank"
                    >
                      {' '}
                      <div class="document-attachment-view__preview">
                        {' '}
                        <img
                          src={file.value.downloadURL}
                          alt={file.value.name}
                          class="preview-image"
                        />{' '}
                      </div>{' '}
                      <div class="document-attachment-view__name-wrap">
                        {' '}
                        <span class="document-attachment-view__icon bi_doc-attachment">
                          <i class="fa fa-paperclip" aria-hidden="true" />
                        </span>
                        <span class="document-attachment-view__filename">
                          {file.value.name}
                        </span>{' '}
                      </div>{' '}
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </React.Fragment>
      );
    } else return <Spinner />;
  }
}
{
  /*          <li key={file.value.name + key}>
                <div class="modal-bottom-buttons">
                  <button
                    class="btn btn-outline-primary bg-white"
                    type="button"
                    id="dropdownMenuButton"
                    //data-toggle="dropdown"
                    //aria-haspopup="true"
                    //aria-expanded="false"
                  >
                    <a
                      href={file.value.downloadURL}
                      //target="_blank"
                      class=""
                    >
                      <i class="fa fa-paperclip" aria-hidden="true" />{' '}
                      <span>{file.value.name}</span>
                    </a>
                  </button>
                </div>
                <iframe src={file.value.downloadURL}></iframe>
              </li> */
}
const mapStateToProps = (state, ownProps) => {
  const auth = state.firebase.auth;
  const id = ownProps.match.params.id;
  return {
    auth: state.firebase.auth,
    companyLogo: state.firebase.ordered && state.firebase.ordered[auth.uid],
    companyData: state.firebase.profile.companyData,
    factureToGenerate:
      state.firestore.ordered.factureToGenerate &&
      state.firestore.ordered.factureToGenerate[0],
    acomptes: state.firestore.ordered.acomptes,
    uploadedFiles: state.firebase.ordered[id],
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'factures2',
        storeAs: 'factureToGenerate',
        doc: props.match.params.id,
      },
      {
        collection: 'acomptes',
        where: [['factureId', '==', props.match.params.id]],
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }, { path: props.match.params.id }];
  })
)(FactureFinal);
