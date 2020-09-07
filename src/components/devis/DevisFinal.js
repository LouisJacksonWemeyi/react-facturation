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
      refDevis: '',
      resMessageFromGenerateDevisPdfPostReq: null,
      messageType: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { devisToGenerate, companyLogo } = nextProps;

    if (companyLogo) {
      axios
        .post('/generateDevisPdf', {
          ...devisToGenerate,
          dateDevis: moment(devisToGenerate.dateDevis.toDate()).format(
            'D-MM-YYYY'
          ),
          dateValiditeDevis: moment(
            devisToGenerate.dateValiditeDevis.toDate()
          ).format('D-MM-YYYY'),
          companyData: this.props.companyData,
          companyLogo: companyLogo.value.downloadURL,
        })
        .then((res) => {
          alert(res.data);
          return axios.get('/fetch-devis-png');
        })
        .then((res) => {
          this.setState({ refDevis: res.data }, () =>
            console.log(this.state.refDevis)
          );
        })
        .catch((err) => {
          //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
          // alert('Erreur survenue lors de la génération du devis\n' + err.message);
          /* this.setState({
          resMessageFromGenerateDevisPdfPostReq:
            err.message + "\nle serveur Node.js ne fonctionne pas!",
          messageType: 'error',
        }); */
          this.setState({
            resMessageFromGenerateDevisPdfPostReq: `Erreur survenue lors de la génération du devis, ${err.message}`,
            messageType: 'error',
          });
        });
      /* axios
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
          this.setState({ refDevis: res.data }, () =>
            console.log(this.state.refFacture)
          );
        })
        .catch((err) => {
          this.setState({
            resMessageFromGenerateDevisPdfPostReq: `Erreur survenue lors de la génération de la facture, ${err.message}`,
            messageType: 'error',
          });
        }); */
    }
  }
  render() {
    const {
      refDevis,
      messageType,
      resMessageFromGenerateDevisPdfPostReq,
    } = this.state;
    const { uploadedFiles, devisToGenerate } = this.props;
    if (devisToGenerate) {
      return (
        <React.Fragment>
          {resMessageFromGenerateDevisPdfPostReq ? (
            <Alert
              message={resMessageFromGenerateDevisPdfPostReq}
              messageType={messageType}
            />
          ) : null}
          {/* <div>
            <Link to="/">
              <i class="far fa-arrow-alt-circle-left" /> Factures
            </Link>
          </div> */}
          <div>
            <a href="/devis">
              <i class="far fa-arrow-alt-circle-left" /> Devis
            </a>
          </div>
          <div>
            <h2>Davis n°{devisToGenerate.numDevis}</h2>
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
                  src={refDevis}
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
    companyLogo:
      state.firebase.ordered[auth.uid] && state.firebase.ordered[auth.uid][0],
    companyData: state.firebase.profile.companyData,
    devisToGenerate:
      state.firestore.ordered.devisToGenerate &&
      state.firestore.ordered.devisToGenerate[0],
    uploadedFiles: state.firebase.ordered[id],
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'devis',
        storeAs: 'devisToGenerate',
        doc: props.match.params.id,
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }, { path: props.match.params.id }];
  })
)(FactureFinal);
