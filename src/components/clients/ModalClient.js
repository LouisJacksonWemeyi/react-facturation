import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalClient(props) {
  const modalTitle = props.client.nom ? props.client.nom : 'Editer le Client';
  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        //{...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-client"
        centered
        //className="modal modal-send in"
        //dialogClassName="modal-90w"
      >
        <Modal.Header className="bg-light d-block" id="modaheader">
          <Modal.Title id="contained-modal-title-client">
            <div hidden={props.showNouveauClient}>{modalTitle}</div>
            <div hidden={!props.showNouveauClient}>Nouveau Client</div>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={(event) => props.handleSubmit(event)}>
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
                          <i class="far fa-user" style={{ color: 'blue' }}></i>
                        </span>
                      </div>
                      <input
                        class="form-control"
                        id="clientNom"
                        name="nom"
                        placeholder="nom complet du client"
                        type="text"
                        value={props.client.nom}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                        placeholder="adresse complete du client"
                        name="adresse"
                        type="text"
                        value={props.client.adresse}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                          <i class="fas fa-phone" style={{ color: 'blue' }}></i>
                        </span>
                      </div>
                      <input
                        class="form-control"
                        id="clientTelephone"
                        name="telephone"
                        placeholder="numeros de telephone du client"
                        type="text"
                        value={props.client.telephone}
                        onChange={(event) => props.handleChange(event)}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="numTva">
                      N° TVA UE OU N° D'ENTREPRISE
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
                        placeholder="numeros de tva ou d'entreprise du client"
                        id="clientTva"
                        name="numTva"
                        type="text"
                        value={props.client.numTva}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                          <i class="fas fa-flag" style={{ color: 'blue' }}></i>
                        </span>
                      </div>
                      <input
                        class="form-control"
                        id="clientPays"
                        placeholder="pays du client"
                        name="pays"
                        type="text"
                        value={props.client.pays}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                        placeholder="adresse email du client"
                        name="email"
                        type="email"
                        value={props.client.email}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                          <i class="fas fa-bars" style={{ color: 'blue' }}></i>
                        </span>
                      </div>
                      <input
                        class="form-control"
                        id="clientNumber"
                        name="numClient"
                        placeholder="numeros client"
                        type="text"
                        value={props.client.numClient}
                        onChange={(event) => props.handleChange(event)}
                        required
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
                        placeholder="notes pour le client"
                        id="clientNotes"
                        name="notes"
                        type="text"
                        value={props.client.notes}
                        onChange={(event) => props.handleChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button onClick={props.onHide} variant="btn btn-outline-primary">
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

ModalClient.propTypes = {};

export default ModalClient;
