import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types'

function EnregistrerAcomptePayeModal(props) {
  const message = (
    <div class="alert alert-warning">
      <span>
        <i class="fas fa-exclamation-triangle" style={{ color: '#3c7dc3' }}></i>{' '}
      </span>
      <b class="text-info">Info!</b>
      <p class="text-info">
        <b>
          Cette action entraîne l'enregistrement de cette facture d'acompte
          comme payée et ne pourra donc plus être modifier ou supprimer.
        </b>
      </p>
    </div>
  );
  //const client=props.EnregistreFacturePaye&&props.EnregistreFacturePaye.id

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
            <p class="text-info">{'Êtes-vous sûr(e) ?'}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <p class="text-info">
            <b>Souhaitez-vous vraiment poursuivre cette action ?</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="btn btn-outline-secondary">
            Annuler
          </Button>
          <Button
            onClick={props.enregistrerAcomptePayeDataBase}
            variant="btn btn-info"
          >
            Continuer
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default EnregistrerAcomptePayeModal;
