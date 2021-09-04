import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  ajouterProduitDataBase,
  updateProduitDataBase,
} from '../../store/actions/produitAction.js';
import { connect } from 'react-redux';
import moment from 'moment';

//import PropTypes from 'prop-types'

class EditerProduitModalDevis extends Component {
  constructor(props) {
    super(props);
    const { indexLigneEditerProduitModalDevis } = this.props;
    const produitEdit = this.props.produitEdit.devis;
    console.log(produitEdit);
    this.state = {
      open: false,
      produit: {
        nom: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].produit,
        description:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis]
            .description,
        netUnitSalesPrice:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].prix,
        rate: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].tva,
        sku: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].sku,
        unite: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].unite,
        id:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].produitId,
        authorId:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].authorId,
        createdAt:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].createdAt,
      },
      showNouveauProduit: false,
      produitUpdate: false,
      produitId: '',
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.produitEdit !== prevProps.produitEdit ||
      this.props.indexLigneEditerProduitModalDevis !==
        prevProps.indexLigneEditerProduitModalDevis
    ) {
      console.log(this.props.produitEdit);
      const { indexLigneEditerProduitModalDevis } = this.props;
      const produitEdit = this.props.produitEdit.devis;
      const produits = this.props.produits ? this.props.produits : [];
      console.log(produitEdit, indexLigneEditerProduitModalDevis);
      const produit = {
        nom: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].produit,
        description:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis]
            .description,
        netUnitSalesPrice:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].prix,
        rate: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].tva,
        sku: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].sku
          ? produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].sku
          : `${produits.length + 1}-${moment(new Date()).format('DD-MM-YYYY')}`,
        unite: produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].unite,
        id:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].produitId,
        authorId:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].authorId,
        createdAt:
          produitEdit.lignesDevis[indexLigneEditerProduitModalDevis].createdAt,
      };
      this.setState({ produit }, () => console.log(this.state.produit));
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.produit.id) {
      //alert('inside update');
      const idx = this.props.indexLigneEditerProduitModalDevis;
      this.props.updateProduitDataBase(this.state.produit);
      this.props.selectProduitLigneFacture({}, idx, this.state.produit);
    } else {
      //alert('inside ajouter');
      const produit = this.state.produit;
      // console.log(produit);
      delete produit.id;
      //console.log(produit);
      const idx = this.props.indexLigneEditerProduitModalDevis;
      this.props.ajouterProduitDataBase(produit);
      this.props.selectProduitLigneFacture({}, idx, produit);
    }
  };

  handleChange = (event) => {
    let produit = { ...this.state.produit };
    produit[event.target.name] = event.target.value;
    this.setState({ produit });
    if (event.target.name == 'nom') {
      this.setState({ showNouveauProduit: false });
    }
  };
  /* componentDidUpdate(prevProps) {
    console.log(this.state);
    if (this.props.produit !== prevProps.produit) {
      const { produit } = this.props;
      this.setState(
        { produit: produit, produitUpdate: true, showNouveauproduit: false },
        console.log(this.state)
      );
      if (produit.showNouveauproduit) {
        this.setState({ showNouveauproduit: true, produitUpdate: false });
      }
    }
  } */
  /* static propTypes = {
    prop: PropTypes
  } */

  render() {
    console.log(this.state);
    const modalTitle = this.state.produit.nom
      ? this.state.produit.nom
      : 'Editer le Produit';
    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          onHide={this.props.closeModal}
          //{...props}
          size="lg"
          aria-labelledby="contained-modal-title-produit"
          centered
          //className="modal modal-send in"
          //dialogClassName="modal-90w"
        >
          <Modal.Header className="bg-light d-block" id="modaheader">
            <Modal.Title id="contained-modal-title-produit">
              <div hidden={this.state.showNouveauProduit}>{modalTitle}</div>
              <div hidden={!this.state.showNouveauProduit}>Nouveau Produit</div>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
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
                        value={this.state.produit.nom}
                        onChange={this.handleChange}
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
                        value={this.state.produit.description}
                        onChange={this.handleChange}
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
                        value={this.state.produit.netUnitSalesPrice}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label class="mandatory-label" for="rate">
                        TVA
                      </label>
                      <select
                        value={this.state.produit.rate}
                        onChange={this.handleChange}
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
                        value={this.state.produit.sku}
                        onChange={this.handleChange}
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
                        value={this.state.produit.unite}
                        onChange={this.handleChange}
                      />
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
                //onClick={() => this.sendFacture(uploadedFiles, authEmail)}
                type="submit"
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
    produits: state.firestore.ordered && state.firestore.ordered.produits,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ajouterProduitDataBase: (produit) =>
      dispatch(ajouterProduitDataBase(produit)),
    updateProduitDataBase: (produit) =>
      dispatch(updateProduitDataBase(produit)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
    ];
  })
)(EditerProduitModalDevis);
