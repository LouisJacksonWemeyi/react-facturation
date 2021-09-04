import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import PropTypes from 'prop-types'

function SupprimerAcompteModal(props) {
  //const client=props.deleteClient&&props.deleteClient.id
  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        //{...props}
        size="lg"
        aria-labelledby="contained-modal-title-client"
        centered
        //className="modal modal-send in"
        //dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-client">
            <p class="text-danger">Êtes-vous sûr(e) ?</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="alert alert-danger">
            <span>
              <i
                class="fas fa-exclamation-triangle"
                style={{ color: 'red' }}
              ></i>{' '}
            </span>
            <b class="text-danger">Danger!</b>
            <p class="text-danger">
              <b>
                Cette action entraîne la suppression définitive de cette facture
                d'acompte et de toutes ses données, y compris les données
                imbriquées.
              </b>
            </p>
          </div>
          <p class="text-danger">
            <b>Souhaitez-vous vraiment poursuivre cette action ?</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="btn btn-outline-secondary">
            Annuler
          </Button>
          <Button
            onClick={props.supprimerAcompteDataBase}
            variant="btn btn-danger"
          >
            Continuer
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

//SupprimerAcompteModal.propTypes = {};

export default SupprimerAcompteModal;
