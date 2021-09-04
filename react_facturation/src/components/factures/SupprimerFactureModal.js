import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types'

function SupprimerFactureModal(props) {
  const nbAcomptesDeLaFactureAsupprimer =
    props.acomptesDeLaFactureAsupprimer.length;
  const message =
    nbAcomptesDeLaFactureAsupprimer > 0 ? (
      <div class="alert alert-warning">
        <span>
          <i
            class="fas fa-exclamation-triangle"
            style={{ color: '#3c7dc3' }}
          ></i>{' '}
        </span>
        <b class="text-info">Info!</b>
        <p class="text-info">
          <b>
            Cette action ne peut être exécuter car la facture possède un ou
            plusieurs acomptes liés.
          </b>
        </p>
      </div>
    ) : (
      <React.Fragment>
        <div class="alert alert-danger">
          <span>
            <i class="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>{' '}
          </span>
          <b class="text-danger">Danger!</b>
          <p class="text-danger">
            <b>
              Cette action entraîne la suppression définitive de toutes les
              données de cette facture, y compris les données imbriquées.
            </b>
          </p>
        </div>
        <p class="text-danger">
          <b>Souhaitez-vous vraiment continuer cette action ?</b>
        </p>
      </React.Fragment>
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
            {nbAcomptesDeLaFactureAsupprimer > 0 ? (
              <p class="text-info">Êtes-vous sûr(e) ?</p>
            ) : (
              <p class="text-danger">Êtes-vous sûr(e) ?</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="btn btn-outline-secondary">
            Annuler
          </Button>
          {nbAcomptesDeLaFactureAsupprimer > 0 ? null : (
            <Button
              onClick={props.supprimerFactureDataBase}
              variant="btn btn-danger"
            >
              Ok
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default SupprimerFactureModal;
