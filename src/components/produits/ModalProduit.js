import React from 'react';
//import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Produit from './Produit';

function ModalProduit(props) {
  const modalTitle = props.produit.nom
    ? props.produit.nom
    : 'Editer le Produit';
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        //{...props}
        size="lg"
        aria-labelledby="contained-modal-title-produit"
        centered
        //className="modal modal-send in"
        //dialogClassName="modal-90w"
      >
        <Modal.Header className="bg-light d-block" id="modaheader">
          <Modal.Title id="contained-modal-title-produit">
            <div hidden={props.showNouveauProduit}>{modalTitle}</div>
            <div hidden={!props.showNouveauProduit}>Nouveau Produit</div>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={(event) => props.handleSubmit(event)}>
          <Modal.Body>
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nom">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      //id="customer-nom"
                      class="form-control"
                      //data-bind="recipient"
                      maxLength="300"
                      //placeholder="Séparer les adresses e-mail par une virgule"
                      value={props.produit.nom}
                      onChange={(event) => props.handleChange(event)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      //id="customer-nom"
                      class="form-control"
                      //data-bind="recipient"
                      maxLength="1500"
                      //placeholder="Séparer les adresses e-mail par une virgule"
                      value={props.produit.description}
                      onChange={(event) => props.handleChange(event)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="netUnitSalesPrice"> Prix HT </label>
                    <input
                      type="text"
                      name="netUnitSalesPrice"
                      //id="netUnitSalesPrice"
                      class="form-control"
                      //data-bind="netUnitSalesPrice"
                      maxLength="30"
                      //placeholder="Séparer les adresses e-mail par une virgule"
                      value={props.produit.netUnitSalesPrice}
                      onChange={(event) => props.handleChange(event)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="mandatory-label" for="rate">
                      TVA
                    </label>
                    <select
                      value={props.produit.rate}
                      onChange={(event) => props.handleChange(event)}
                      class="form-control"
                      name="rate"
                    >
                      <option value="0">0 %</option>
                      <option value="6">6 %</option>
                      <option value="12">12 %</option>
                      <option value="21">21 %</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="sku">N° de Produit</label>
                    <input
                      type="text"
                      name="sku"
                      //id="customer-nom"
                      class="form-control"
                      //data-bind="recipient"
                      maxLength="30"
                      //placeholder="Séparer les adresses e-mail par une virgule"
                      value={props.produit.sku}
                      onChange={(event) => props.handleChange(event)}
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="unite">Unité</label>
                    <input
                      type="text"
                      name="unite"
                      //id="unite"
                      class="form-control"
                      //data-bind="netUnitSalesPrice"
                      maxLength="30"
                      //placeholder="Séparer les adresses e-mail par une virgule"
                      value={props.produit.unite}
                      onChange={(event) => props.handleChange(event)}
                      required
                    />
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
              //onClick={() => this.sendFacture(uploadedFiles, authEmail)}
              type="submit"
              class="last-focus-target btn btn-primary draft-send-btn"
            >
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

ModalProduit.propTypes = {};

export default ModalProduit;
