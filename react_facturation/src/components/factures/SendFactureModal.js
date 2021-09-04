import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import Spinner from '../layout/Spinner1.js';
import '../../css/facturesCss/sendFactureModal.css';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import axios from 'axios';
import Alert from '../layout/Alert';
import { updateFactureStatut } from '../../store/actions/factureActions.js';

class SendFactureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyMailSend: true,
      email: `${this.props.state.facture.client.emailClient}`,
      emailSubject: `Facture n° ${this.props.state.facture.numFacture} de ${this.props.profile.companyData.nomEntreprise}`,
      message: `Cher/Chère ${this.props.state.facture.client.nomClient},

Une nouvelle facture de ${this.props.state.facture.montantFacture} € vous a été adressée.
Vous trouverez ci-joint une copie au format PDF.

Vous pouvez également la consulter en ligne à l'adresse suivante: http://www.facdev.be/signin. 
Veuillez créer un compte avec l'adresse e-mail:${this.props.state.facture.client.emailClient} et le rôle:client si vous n'avez pas encore de compte.

Bien cordialement,

${this.props.profile.companyData.nomEntreprise}`,
      resMessageFromSendFacturePostReq: '',
      messageType: '',
      spinner: '',
    };
  }

  sendFacture = (uploadedFiles, authEmail) => {
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
      .post('/sendFacture', data)
      .then((res) => {
        this.setState({
          resMessageFromSendFacturePostReq: res.data.message,
          messageType: res.data.messageType,
        });
        return res.data.messageType;
      })
      .then((res) => {
        if (res === 'success') {
          if (
            (this.props.state.facture.factureStatut !== 'payee') &
            (this.props.state.facture.factureStatut !== 'envoyee')
          )
            this.props.updateFactureStatut(this.props.state.facture, 'envoyee');
        }
      })
      .catch((err) => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err });
        //console.log(err);
        //alert("Erreur survenu lors de l'envoi du message\n" + err.message);
        this.setState({
          resMessageFromSendFacturePostReq:
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
    if (this.props.state !== prevProps.state) {
      const facture = this.props.state.facture;
      const copyMailSend = true;
      const email = facture.client.emailClient;
      const emailSubject = `Facture n° ${facture.numFacture} de ${this.props.profile.companyData.nomEntreprise}`;
      const message = `Cher/Chère ${facture.client.nomClient},

Une nouvelle facture de ${facture.montantFacture} € vous a été adressée.
Vous trouverez ci-joint une copie au format PDF.

Vous pouvez également consulter la facture en ligne à l'adresse suivante: http://www.facdev.be/signin. 
Veuillez créer un compte avec l'adresse e-mail:${facture.client.emailClient} et le rôle:client si vous n'avez pas encore de compte.

Bien cordialement,

${this.props.profile.companyData.nomEntreprise}`;
      const resMessageFromSendFacturePostReq = this.props.state
        .resMessageFromGenerateFacturePdfPostReq;
      const messageType = this.props.state.messageType;
      this.setState({
        copyMailSend,
        emailSubject,
        message,
        resMessageFromSendFacturePostReq,
        messageType,
        email,
      });
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
      resMessageFromSendFacturePostReq: '',
      messageType: '',
      spinner: '',
    });
    this.props.onHide();
  };

  /* handleInputChange = event => {
    setMailFacture({ ...mailFacture, [event.target.name]: event.target.value });
  }; */
  render() {
    const { uploadedFiles, refFacture, authEmail } = this.props;
    console.log(this.props.facture);

    /* var imageFacture = refFacture ? (
      <img  src="https://firebasestorage.googleapis.com/v0/b/react-facturation-projec-4553e.appspot.com/o/Oo8wJkiuKRsu8r2jYwxY%2FCapture3T.PNG?alt=media&token=9944ef92-249e-4b62-8287-f1a0e6ee5370"
        class="doc-preview"
        src={refFacture}
      />
    ) : (
      <Spinner />
    ); */

    var imageFacture = refFacture ? (
      <iframe
        className="preview-area-plugin"
        //src="https://firebasestorage.googleapis.com/v0/b/react-facturation-projec-4553e.appspot.com/o/facture.pdf?alt=media&token=63309f80-4a6a-4346-91f3-3a002e709b25"
        //src="https://us-central1-react-facturation-projec-4553e.cloudfunctions.net/app/facture"
        //src={`https://us-central1-react-facturation-projec-4553e.cloudfunctions.net/app/${refFacture}`}
        style={{ frameborder: '0' }}
        //src="http://localhost:5000/fetch-facture-pdf"
        src={refFacture}
      ></iframe>
    ) : (
      <Spinner />
    );
    var alert = this.state.resMessageFromSendFacturePostReq ? (
      <Alert
        message={this.state.resMessageFromSendFacturePostReq}
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
        aria-labelledby="contained-modal-title-sendfacture"
        centered
        className="modal modal-send in"
        dialogClassName="modal-90w"
      >
        {/* <Modal.Header closeButton className="bg-light d-block" id="modaheader"> */}
        <Modal.Header className="bg-light">
          <Modal.Title id="contained-modal-title-sendfacture">
            <div style={{ display: 'centered' }}>{alert}</div>
            <h4>
              Envoi de la facture n° {this.props.state.facture.numFacture}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body class="send-form-col">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6 mt-2">{imageFacture}</div>
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
                      style={{ height: '225px' }}
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
                              {/* <i
                                      class="fa fa-paperclip"
                                      aria-hidden="true"
                                    />{' '}
                                    <span>{file.value.name}</span> */}
                            </button>
                            {/* <div
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
                                  </div>  */}
                          </div>
                        </li>
                      ))}
                  </div>
                  <div class="modal-bottom-buttons">
                    {/* <button
                    type="button"
                    class="last-focus-target btn draft-send-btn mrm "
                  >
                    Annuler
                  </button> */}
                  </div>
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
              onClick={() => this.sendFacture(uploadedFiles, authEmail)}
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
    updateFactureStatut: (facture, factureStatut) =>
      dispatch(updateFactureStatut(facture, factureStatut)),
  };
};
const mapStateToProps = (state, props) => {
  //console.log(props);
  const id = props.state.facture.id;
  return {
    authEmail: state.firebase.auth.email,
    profile: state.firebase.profile,
    uploadedFiles: state.firebase.ordered[id],
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => {
    return [{ path: props.state.facture.id }];
  })
)(SendFactureModal);
{
  /* <div class="modal modal-send in" style="left: 435px; top: 344px;">
   <div class="modal-header">
    {' '}
    <h2 class="modal-title">Envoyer Facture</h2>{' '}
    <button class="cellRight modal-close">
      <i class="app-icns icn-svg-modal-close"></i>
    </button>{' '}
  </div>{' '}
  <div class="modal-fullsize-feedback pan hide">
    {' '}
    <div class="spinner"></div>{' '}
    <span class="big-text">Envoi de la facture en cours</span>{' '}
    <span class="small-text mbxl">Veuillez patienter...</span>{' '}
  </div>{' '}
  <div class="content clearfix">
    {' '}
    <div class="cell s1of2">
      {' '}
      <div class="document-preview-deck">
        {' '}
        <div class="document-preview-view">
          {' '}
          <div
            class="attachment-preloader spinner"
            style="display: none;"
          ></div>{' '}
          <img
            src="/api/sales/draftinvoices/5c0fcae4b4437a002049ea1d/thumbnail/v1?asBooked=true&amp;csrfToken=5c0fa2c8acb29e0020b9a60a"
            class="doc-preview"
          />
        </div>{' '}
      </div>{' '}
    </div>{' '}
    <div class="cell s1of2 lastCell send-form-col pal">
      {' '}
      <div
        class="notes bar-sml bar-error mbml"
        style="display: none;"
      ></div>{' '}
      <form class="modal-body pan" autocomplete="off">
        {' '}
        <label for="customer-email">E-mail</label>{' '}
        <div class="autocompleteOff-wrap mbml">
          {' '}
          <input tabindex="-1" class="textInput" type="text" />{' '}
          <input
            type="text"
            id="customer-email"
            class="first-focus-target autocompleteOff-autofillTop textInput recipient no-scroll mbml"
            data-bind="recipient"
            maxlength="300"
            placeholder="Séparer les adresses e-mail par une virgule"
            value=""
          />{' '}
        </div>{' '}
        <label for="email-subject">Objet</label>{' '}
        <div class="autocompleteOff-wrap mbml">
          {' '}
          <input tabindex="-1" class="textInput" type="text" />{' '}
          <input
            type="text"
            id="email-subject"
            class="textInput autocompleteOff-autofillTop subject mbml"
            data-bind="subject"
            maxlength="80"
            value=""
          />{' '}
        </div>{' '}
        <label for="message">Message à l'attention du client</label>{' '}
        <textarea
          id="message"
          maxlength="10000"
          data-bind="message"
          class="message textarea-large autogrow"
          style="height: 150px;"
        ></textarea>{' '}
        <div class="mtml mbml">
          {' '}
          Les PDF sont toujours attachés à ton message.{' '}
        </div>{' '}
        <div class="clearfix mbl">
          {' '}
          <input
            type="checkbox"
            id="copyMail"
            data-bind="copyMail"
            class="chb-custom"
          />{' '}
          <label for="copyMail" class="chb-label">
            {' '}
            M'envoyer une copie{' '}
          </label>{' '}
        </div>{' '}
        <div class="attachments__list">
          <a
            href="/api/files/5d6f9d1c77c94d0020700d95/v1?csrfToken=5c0fa2c8acb29e0020b9a60a"
            target="_blank"
            class="document-attachment-view"
          >
            {' '}
            <span class="document-attachment-view__icon bi_doc-attachment"></span>{' '}
            <span class="attachment-label__filename">Capture1.PNG</span>{' '}
          </a>
        </div>{' '}
        <div class="modal-bottom-buttons">
          {' '}
          <button type="button" class="btn mrm cancel-btn">
            Annuler
          </button>{' '}
          <button
            type="submit"
            class="last-focus-target btn btn-primary draft-send-btn"
          >
            Envoyer
          </button>{' '}
        </div>{' '}
      </form>{' '}
    </div>{' '}
  </div>
</div>;*/
}
