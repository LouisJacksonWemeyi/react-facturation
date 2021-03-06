import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import Spinner from '../layout/Spinner1.js';
import '../../css/facturesCss/sendFactureModal.css';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateDevisStatut } from '../../store/actions/devisActions.js';
import axios from 'axios';
import Alert from '../layout/Alert';

class SendDevisModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyMailSend: true,
      email: `${this.props.devis.client.emailClient}`,
      emailSubject: `Devis n° ${this.props.devis.numDevis} de ${this.props.profile.companyData.nomEntreprise}`,
      message: `Cher/Chère ${this.props.devis.client.nomClient},

Un nouveau Devis de ${this.props.devis.montantDevis} € vous a été adressé. 
Vous trouverez ci-joint une copie au format PDF.

Bien cordialement,
${this.props.profile.companyData.nomEntreprise}`,
      resMessageFromSendDevisPostReq: '',
      messageType: '',
      spinner: '',
    };
  }

  sendDevis = (uploadedFiles, authEmail) => {
    this.setState({
      spinner: <Spinner />,
    });
    var email = '';
    if (this.state.copyMailSend === true) {
      email = this.state.email ? this.state.email + `,${authEmail}` : authEmail;
    } else {
      email = this.state.email;
    }
    const attachments =
      uploadedFiles &&
      uploadedFiles.map((file) => ({
        downloadURL: file.value.downloadURL,
        name: file.value.name,
      }));
    const data = {
      from: `"${this.props.profile.firstName} ${this.props.profile.lastName}" <${authEmail}>`,
      emailSubject: this.state.emailSubject,
      message: this.state.message,
      email: email,
      attachments: attachments ? attachments : [],
    };
    axios
      .post('/sendDevis', data)
      .then((res) => {
        this.setState({
          resMessageFromSendDevisPostReq: res.data.message,
          messageType: res.data.messageType,
        });
        return res.data.messageType;
      })
      .then((res) => {
        if (res === 'success') {
          if (
            (this.props.devis.devisStatut !== 'accepte') &
            (this.props.devis.devisStatut !== 'envoyee')
          )
            this.props.updateDevisStatut(this.props.devis, 'envoyee');
        }
      })
      .catch((err) => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
        //alert("Erreur survenu lors de l'envoi du message\n" + err.message);
        this.setState({
          resMessageFromSendDevisPostReq:
            "Erreur survenu lors de l'envoi du message,\n" + err.message,
          messageType: 'error',
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.devis !== prevProps.devis) {
      const copyMailSend = true;
      const email = this.props.devis.client.emailClient;
      const emailSubject = `Devis n° ${this.props.devis.numDevis} de ${this.props.profile.companyData.nomEntreprise}`;
      const message = `Cher/Chère ${this.props.devis.client.nomClient},

Un nouveau Devis de ${this.props.devis.montantDevis} € vous a été adressé. 
Vous trouverez ci-joint une copie au format PDF.

Bien cordialement,
${this.props.profile.companyData.nomEntreprise}`;
      this.setState({ copyMailSend, emailSubject, message, email });
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  closeModal = () => {
    this.setState({
      resMessageFromSendDevisPostReq: '',
      messageType: '',
      spinner: '',
    });
    this.props.onHide();
  };

  render() {
    const { uploadedFiles, refDevis, authEmail } = this.props;
    console.log(this.props.devis);

    var imageDevis = refDevis ? (
      <iframe className="preview-area-plugin" src={refDevis}></iframe>
    ) : (
      <Spinner />
    );
    var alert = this.state.resMessageFromSendDevisPostReq ? (
      <Alert
        message={this.state.resMessageFromSendDevisPostReq}
        messageType={this.state.messageType}
      />
    ) : (
      this.state.spinner
    );

    return (
      <Modal
        show={this.props.show}
        onHide={() => this.closeModal}
        //{...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-sendDevis"
        centered
        className="modal modal-send in"
        dialogClassName="modal-90w"
      >
        {/*<Modal.Header className="bg-light d-block" id="modaheader">*/}
        <Modal.Header className="bg-light">
          <Modal.Title id="contained-modal-title-sendDevis">
            <div style={{ display: 'centered' }}>{alert}</div>
            <h4>Envoi du Devis n° {this.props.devis.numDevis}</h4>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body class="send-form-col">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6 mt-2">{imageDevis}</div>
                <div class="col-lg-6 cell send-form-col">
                  <div class="form-group">
                    <label for="email">E-mail</label>
                    <input
                      type="text"
                      name="email"
                      //id="customer-email"
                      class="form-control"
                      //data-bind="recipient"
                      maxLength="300"
                      placeholder="Séparez les adresses e-mail par une virgule"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    Séparez les adresses e-mail par une virgule
                  </div>
                  <div class="form-group">
                    <label for="emailSubject">Objet</label>
                    <input
                      type="text"
                      name="emailSubject"
                      //id="emailSubject"
                      class="form-control"
                      //data-bind="emailSubject"
                      maxLength="80"
                      value={this.state.emailSubject}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="message">Message à l'attention du client</label>
                    <textarea
                      id="message"
                      name="message"
                      maxLength="10000"
                      data-bind="message"
                      class="form-control"
                      style={{ height: '220px' }}
                      value={this.state.message}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div class="mtml mbml">
                    Les PDF sont toujours attachés à ton message.
                  </div>
                  <div className="form-check">
                    <label for="copyMail" class="form-check-label">
                      <input
                        type="checkbox"
                        name="copyMailSend"
                        id="copyMail"
                        data-bind="copyMail"
                        class="form-check-input lg"
                        checked={this.state.copyMailSend}
                        onChange={this.handleInputChange}
                      />
                      M'envoyer une copie
                    </label>
                    <br />
                  </div>
                  <div class="mtml mbml">
                    {uploadedFiles &&
                      uploadedFiles.map((file, key) => (
                        <li key={file.value.name + key}>
                          <div class="modal-bottom-buttons">
                            <button
                              class="btn btn-outline-primary bg-white"
                              type="button"
                              id="dropdownMenuButton"
                            >
                              <a href={file.value.downloadURL} class="">
                                <i class="fa fa-paperclip" aria-hidden="true" />{' '}
                                <span>{file.value.name}</span>
                              </a>
                            </button>
                          </div>
                        </li>
                      ))}
                  </div>
                  <div class="modal-bottom-buttons"></div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <button
              onClick={this.closeModal}
              type="button"
              class="btn btn-outline-primary mrm bg-white text-primary"
            >
              Annuler
            </button>
            {/* <Button onClick={this.closeModal}>Close</Button> */}
            <button
              onClick={() => this.sendDevis(uploadedFiles, authEmail)}
              type="submit"
              class="last-focus-target btn btn-primary draft-send-btn"
            >
              Envoyer
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateDevisStatut: (devis, devisStatut) =>
      dispatch(updateDevisStatut(devis, devisStatut)),
  };
};
const mapStateToProps = (state, props) => {
  //console.log(props);
  const id = props.devis.id;
  return {
    authEmail: state.firebase.auth.email,
    profile: state.firebase.profile,
    uploadedFiles: state.firebase.ordered[id],
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => {
    return [{ path: props.devis.id }];
  })
)(SendDevisModal);
