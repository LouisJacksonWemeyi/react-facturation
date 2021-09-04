import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

//import PropTypes from 'prop-types'

function DownloadFactureModal(props) {
  const {
    createAndDownloadFacturePDF,
    factureToDownload,
    acomptesFactureToDownload,
    companyLogo,
    companyData,
  } = props;
  if (factureToDownload) {
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
                  Cette action entraîne l'enregistrement de la facture comme
                  payée et ne pourra donc plus être modifier ou supprimer.
                </b>
              </p>
            </div>
            <p class="text-info">
              <b>Souhaitez-vous vraiment continuer cette action ?</b>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} variant="btn btn-outline-secondary">
              Annuler
            </Button>
            <Button
              onClick={() =>
                createAndDownloadFacturePDF(
                  factureToDownload,
                  acomptesFactureToDownload,
                  companyLogo,
                  companyData
                )
              }
              variant="btn btn-info"
            >
              Continuer
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);

  const factureToDownload = ownProps.factureToDownload
    ? ownProps.factureToDownload
    : state.firebase.auth;
  console.log(factureToDownload);
  return {
    factureToDownload: factureToDownload,
    companyLogo:
      state.firebase.ordered[factureToDownload.authorId] &&
      state.firebase.ordered[factureToDownload.authorId][0],
    companyData: state.firebase.profile.companyData,
    acomptesFactureToDownload:
      state.firestore.ordered &&
      state.firestore.ordered.acomptesFactureToDownload,
  };
};
const mapDispatchToProps = {};
DownloadFactureModal.propTypes = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'acomptesFactureToDownload',
        where: [['factureId', '==', props.factureToDownload.id]],
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.factureToDownload.id }];
  })
)(DownloadFactureModal);
