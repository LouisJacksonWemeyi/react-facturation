import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  ajouterClientDataBase,
  updateClientDataBase,
} from '../../store/actions/clientAction.js';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

//import PropTypes from 'prop-types'

class EditerClientModalFacture extends Component {
  constructor(props) {
    super(props);
    const clientEdit = this.props.clientEdit.facture;
    console.log(clientEdit);
    this.state = {
      client: {
        id: clientEdit.client.clientId,
        nom: clientEdit.client.nomClient,
        adresse: clientEdit.client.adressClient,
        pays: clientEdit.client.paysClient,
        email: clientEdit.client.emailClient,
        telephone: clientEdit.client.telephonClient,
        numTva: clientEdit.client.numTvaClient,
        numClient: clientEdit.client.numClient,
        authorId: clientEdit.client.authorId,
        createdAt: clientEdit.client.createdAt,
        notes: clientEdit.notesFacture,
      },
      open: false,
      showNouveauClient: false,
      clientUpdate: false,
      //clientId: '',
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.clientEdit !== prevProps.clientEdit) {
      const clientEdit = this.props.clientEdit.facture;
      const clients = this.props.clients ? this.props.clients : [];
      const client = {
        nom: clientEdit.client.nomClient,
        adresse: clientEdit.client.adressClient,
        pays: clientEdit.client.paysClient,
        email: clientEdit.client.emailClient,
        telephone: clientEdit.client.telephonClient,
        numTva: clientEdit.client.numTvaClient,
        numClient: clientEdit.client.numClient
          ? clientEdit.client.numClient
          : `${clients.length + 1}-${moment(new Date()).format('DD-MM-YYYY')}`,
        authorId: clientEdit.client.authorId,
        createdAt: clientEdit.client.createdAt,
        notes: clientEdit.notesFacture,
        id: clientEdit.client.clientId,
      };
      this.setState({ client }, () => console.log(this.state.client));
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.client.id) {
      //alert('indide update');
      this.props.updateClientDataBase(this.state.client);
      //this.props.SelectClientModal(this.state.client);
      this.props.selectClient(this.state.client);
    } else {
      //alert('indide ajouter');
      const client = this.state.client;
      delete client.id;
      this.props.ajouterClientDataBase(client);
      this.props.selectClient(client);
    }
  };

  handleChange = (event) => {
    let client = { ...this.state.client };
    client[event.target.name] = event.target.value;
    this.setState({ client });
    if (event.target.name == 'nom') {
      this.setState({ showNouveauClient: false });
    }
  };

  /* componentDidUpdate(prevProps) {
    console.log(this.state);
    if (this.props.client !== prevProps.client) {
      const { client } = this.props;
      this.setState(
        { client: client, clientUpdate: true, showNouveauClient: false },
        console.log(this.state)
      );
      if (client.showNouveauClient) {
        this.setState({ showNouveauClient: true, clientUpdate: false });
      }
    }
  } */
  /* static propTypes = {
    prop: PropTypes
  } */

  render() {
    console.log(this.state);
    const modalTitle = this.state.client.nom
      ? this.state.client.nom
      : 'Editer le Client';
    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          onHide={this.props.closeModal}
          //{...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-client"
          centered
          //className="modal modal-send in"
          //dialogClassName="modal-90w"
        >
          <Modal.Header className="bg-light d-block" id="modaheader">
            <Modal.Title id="contained-modal-title-client">
              <div hidden={this.state.showNouveauClient}>{modalTitle}</div>
              <div hidden={!this.state.showNouveauClient}>Nouveau Client</div>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="control-label" for="nom">
                        Nom
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="far fa-user"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientNom"
                          name="nom"
                          type="text"
                          value={this.state.client.nom}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="adresse">
                        Adresse
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-map-marker-alt"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <textarea
                          class="form-control"
                          id="clientAdresse"
                          name="adresse"
                          type="text"
                          value={this.state.client.adresse}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="control-label" for="telephone">
                        Téléphone
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-phone"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientTelephone"
                          name="telephone"
                          type="text"
                          value={this.state.client.telephone}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="numTva">
                        N° TVA UE
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-landmark"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientTva"
                          name="numTva"
                          type="text"
                          value={this.state.client.numTva}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="control-label" for="pays">
                        Pays
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-flag"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientPays"
                          name="pays"
                          type="text"
                          value={this.state.client.pays}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="email">
                        E-mail
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-at" style={{ color: 'blue' }}></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientEmail"
                          name="email"
                          type="text"
                          value={this.state.client.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="control-label" for="numClient">
                        Numéro de Client
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-bars"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientNumber"
                          name="numClient"
                          type="text"
                          value={this.state.client.numClient}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label" for="notes">
                        Notes
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i
                              class="fas fa-comment-alt"
                              style={{ color: 'blue' }}
                            ></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          id="clientNotes"
                          name="notes"
                          type="text"
                          value={this.state.client.notes}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-light">
              <Button
                onClick={this.props.closeModal}
                variant="btn btn-outline-primary"
              >
                Annuler
              </Button>
              <Button
                //onClick={() => this.sendFacture(uploadedFiles, authclientNom)}
                type="submit"
                value="submit"
                class="last-focus-target btn btn-primary draft-send-btn"
              >
                Enregistrer
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    clients: state.firestore.ordered && state.firestore.ordered.clients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ajouterClientDataBase: (client) => dispatch(ajouterClientDataBase(client)),
    updateClientDataBase: (client) => dispatch(updateClientDataBase(client)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
    ];
  })
)(EditerClientModalFacture);
