import React, { Component } from 'react';
/* import LignesDevis from './LignesDevis';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; */
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { updateDevisDataBase } from '../../store/actions/devisActions';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Spinner from '../layout/Spinner';
import LignesDevisDetails from './LignesDevisDetails';
import Alert from '../layout/Alert.js';

const $ = require('jquery');

class DevisDetails extends Component {
  state = { showSpinner: false };
  handleEnregitrer = (devis, event) => {
    //const faccture = Devise;
    this.setState({ showSpinner: true });
    const { updateDevisDataBase, clearFactureState, history } = this.props;
    console.log(devis);

    const montantDevis = devis.lignesDevis
      .map(
        (ligneDevis) =>
          (ligneDevis.quantite *
            ligneDevis.prix *
            ((100 - ligneDevis.reduction) * ligneDevis.tva +
              100 * (100 - ligneDevis.reduction))) /
          10000
      )
      .reduce(function (a, b) {
        return a + b;
      });
    devis.montantDevis = montantDevis;
    delete devis.client.authorId;
    delete devis.client.createdAt;
    devis.lignesDevis.map((ligneDevis) => {
      delete ligneDevis.authorId;
      delete ligneDevis.createdAt;
    });
    console.log(devis);
    updateDevisDataBase(devis);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          history.push('/devis');
        });
    }, 5000);
    event.preventDefault();
    /* firestore
      .set({ collection: 'devis', doc: this.props.devis.id }, { ...devis })
      .then((res) => {
        history.push('/devis');
      }); */
    /* firestore
      .update({ collection: 'Deviss2', doc: Devis.id }, { ...Devise })
      .then(history.push('/')); */
    //this.props.createDevis2(this.state.Devis);
    //this.props.history.push('/');
    //this.setState({ redirecto: '/' });
  };

  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop = (files) => {
    // uploadFiles(storagePath, files, dbPath)
    const filesPath = this.props.match.params.id;
    return this.props.firebase.uploadFiles(filesPath, files, filesPath);
  };

  // Deletes file and removes metadata from database
  onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    const filesPath = this.props.match.params.id;
    return this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  };

  render() {
    const { uploadedFiles, devis, devisMessage, messageType } = this.props;
    const { showSpinner } = this.state;
    //if (redirecto) return <Redirect to={redirecto} />;
    if (devis) {
      return (
        <div>
          {devisMessage ? (
            <Alert message={devisMessage} messageType={messageType} />
          ) : showSpinner ? (
            <Spinner />
          ) : null}
          {/* {showSpinner ? (
            <Spinner />
          ) : (
            <Alert message={devisMessage} messageType={messageType} />
          )} */}
          <LignesDevisDetails
            devis={devis}
            //id={devis.id}
            handleEnregitrer={this.handleEnregitrer}
          />
          {/* debut code pièce jointe document au devis */}
          <div className="piecejointecontainerArea document-form">
            <h5>Pièces jointes</h5>
            <div className="factureUploadArea">
              <div className="piecejointecontainer">
                <Dropzone
                  onDrop={(acceptedFiles) => this.onFilesDrop(acceptedFiles)}
                  noClick={true}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps({
                          className: 'dropzone',
                        })}
                      >
                        <input {...getInputProps()} />

                        <span class="btn btn-primary btn-file">
                          <i class="fa fa-paperclip" aria-hidden="true" />
                          <input
                            name="fichiersDuDevis"
                            type="file"
                            multiple={true}
                            onChange={(e) => this.onFilesDrop(e.target.files)}
                          />
                        </span>

                        <span>
                          &nbsp;&nbsp;Fais un glisser-déposer ou sélectionne les
                          fichiers à télécharger et à envoyer avec ton Devis.
                        </span>
                        <ul>
                          {uploadedFiles &&
                            uploadedFiles.map((file, key) => (
                              <li key={file.value.name + key}>
                                <div class="dropdown">
                                  <button
                                    class="btn btn-outline-primary my-2 dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <i
                                      class="fa fa-paperclip"
                                      aria-hidden="true"
                                    />{' '}
                                    <span>{file.value.name}</span>
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a class="dropdown-item" href="#">
                                      Action
                                    </a>
                                    <a class="dropdown-item" href="#">
                                      Another action
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      //href="#"
                                      onClick={() =>
                                        this.onFileDelete(file.value, file.key)
                                      }
                                    >
                                      Supprimer
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateDevisDataBase: (devis) => dispatch(updateDevisDataBase(devis)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const {
    firestore: { ordered },
  } = state;
  /*const Deviss = state.firestore.data.Deviss2;
  const Devis = Deviss ? Deviss[id] : null; */
  return {
    devis: ordered.devis && ordered.devis[0],
    uploadedFiles: state.firebase.ordered[id],
    devisMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => {
    return [{ path: props.match.params.id }];
  }),
  firestoreConnect((props) => [
    { collection: 'devis', storeAs: 'devis', doc: props.match.params.id },
  ])
)(DevisDetails);
