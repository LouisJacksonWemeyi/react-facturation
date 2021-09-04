import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types'

function SupprimerDevisModal(props) {
  const nbFacturesLieesDevisAsupprimer =
    props.facturesLieesDevisAsupprimer.length;
  const message =
    nbFacturesLieesDevisAsupprimer > 0 ? (
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
            Cette action ne peut être exécuter car le devis est lié à une ou
            plusieurs factures.
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
              données de ce devis, y compris les données imbriquées.
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
            {nbFacturesLieesDevisAsupprimer > 0 ? (
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
          {nbFacturesLieesDevisAsupprimer > 0 ? null : (
            <Button
              onClick={props.supprimerDevisDataBase}
              variant="btn btn-danger"
            >
              Continuer
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default SupprimerDevisModal;
