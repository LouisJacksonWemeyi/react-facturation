import React, { Component } from 'react';
//import LignesFacture from './LignesFacture';
//import { Link } from 'react-router-dom';
//import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { updateFactureDataBase } from '../../store/actions/factureActions';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Spinner from '../layout/Spinner';
import LignesFactureDetails from './LignesFactureDetails';
import Alert from '../layout/Alert.js';
const $ = require('jquery');

class FactureDetails2 extends Component {
  state = { showSpinner: false };
  handleEnregistrer = (facture, totalAcomptes, e) => {
    //const faccture = facturee;
    this.setState({ showSpinner: true });
    const { updateFactureDataBase, clearFactureState, history } = this.props;
    console.log(facture);

    const montantFacture =
      facture.lignesFacture
        .map(
          (ligneFacture) =>
            (ligneFacture.quantite *
              ligneFacture.prix *
              ((100 - ligneFacture.reduction) * ligneFacture.tva +
                100 * (100 - ligneFacture.reduction))) /
            10000
        )
        .reduce(function (a, b) {
          return a + b;
        }) - totalAcomptes;
    facture.montantFacture = montantFacture;
    delete facture.client.authorId;
    delete facture.client.createdAt;
    facture.lignesFacture.map((ligneFacture) => {
      delete ligneFacture.authorId;
      delete ligneFacture.createdAt;
    });
    console.log(facture);
    updateFactureDataBase(facture);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          history.push('/');
        });
    }, 4000);
    e.preventDefault();

    /* firestore
      .update({ collection: 'factures2', doc: facture.id }, { ...facturee })
      .then(history.push('/')); */
    //this.props.createFacture2(this.state.facture);
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
    const { uploadedFiles, facture, factureMessage, messageType } = this.props;
    const { showSpinner } = this.state;
    //if (redirecto) return <Redirect to={redirecto} />;
    if (facture) {
      return (
        <div>
          {factureMessage ? (
            <Alert message={factureMessage} messageType={messageType} />
          ) : showSpinner ? (
            <Spinner />
          ) : null}
          <LignesFactureDetails
            facture={facture}
            id={facture.id}
            handleEnregistrer={this.handleEnregistrer}
          />
          {/* debut code pièce jointe document à la facture */}
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
                            name="fichiersDeLaFacture"
                            type="file"
                            multiple={true}
                            onChange={(e) => this.onFilesDrop(e.target.files)}
                          />
                        </span>

                        <span>
                          &nbsp;&nbsp;Fais un glisser-déposer ou sélectionne les
                          fichiers à télécharger et à envoyer avec ta facture.
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
    updateFactureDataBase: (facture) =>
      dispatch(updateFactureDataBase(facture)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const {
    firestore: { ordered },
  } = state;
  /*const factures = state.firestore.data.factures2;
  const facture = factures ? factures[id] : null; */
  return {
    facture: ordered.facture && ordered.facture[0],
    uploadedFiles: state.firebase.ordered[id],
    factureMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => {
    return [{ path: props.match.params.id }];
  }),
  firestoreConnect((props) => [
    { collection: 'factures2', storeAs: 'facture', doc: props.match.params.id },
  ])
)(FactureDetails2);
