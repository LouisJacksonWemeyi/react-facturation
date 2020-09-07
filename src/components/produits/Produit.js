import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
//import ProduitModal from './ProduitModal.js'
import ModalProduit from './ModalProduit.js';
import { ajouterProduitDataBase } from '../../store/actions/produitAction.js';
import { updateProduitDataBase } from '../../store/actions/produitAction.js';
import { deleteProduitDataBase } from '../../store/actions/produitAction.js';
import ProduitsListDataTable from './ProduitsListDataTable.js';
import Spinner from '../layout/Spinner';
import DeleteProduitModal from './DeleteProduitModal.js';
import moment from 'moment';
import Alert from '../layout/Alert.js';

class Produit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      produit: {
        nom: '',
        description: '',
        netUnitSalesPrice: '',
        rate: '',
        sku: '',
        unite: '',
      },
      showNouveauProduit: true,
      produitUpdate: false,
      openProduitModal: false,
      deleteProduit: {},
    };
  }

  handleChange = (event) => {
    let produit = { ...this.state.produit };
    produit[event.target.name] = event.target.value;
    this.setState({ produit });
    if (event.target.name == 'nom') {
      this.setState({ showNouveauProduit: false });
    }
  };

  handleSubmit = (e) => {
    if (!this.state.produitUpdate) {
      //alert('indide ajouter');
      this.props.ajouterProduitDataBase(this.state.produit);
    } else {
      //alert('indide update');
      this.props.updateProduitDataBase(this.state.produit);
    }
    e.preventDefault();
  };

  handleModal = (data) => {
    const produit = { ...this.state.produit };
    produit.nom = '';
    produit.description = '';
    produit.netUnitSalesPrice = '';
    produit.rate = '21';
    produit.unite = 'pièce(s)';
    this.setState({
      produit,
      showNouveauProduit: true,
      open: data,
      produitUpdate: false,
    });
  };

  updateProduit = (produit) => {
    this.setState({
      produit,
      open: true,
      showNouveauProduit: false,
      produitUpdate: true,
    });
  };

  handleDeleteProduitModal = (data, produit) => {
    this.setState({ openProduitModal: data, deleteProduit: produit });
  };

  handleDeleteProduitDataBase = () => {
    this.props.deleteProduitDataBase(this.state.deleteProduit);
  };
  componentWillReceiveProps(nextProps) {
    // Typical usage (don't forget to compare props):
    const numProduit = nextProps.produits ? nextProps.produits.length + 1 : 1;
    const produit = { ...this.state.produit };
    produit.sku = `${numProduit}-${moment(new Date()).format('DD-MM-YYYY')}`;
    this.setState({ produit });
  }

  render() {
    const { produits, produitMessage, messageType } = this.props;
    if (produits) {
      return (
        <React.Fragment>
          {produitMessage ? (
            <Alert message={produitMessage} messageType={messageType} />
          ) : null}
          <h2>Produits</h2>
          <h2>
            <ButtonToolbar>
              <Button variant="primary" onClick={() => this.handleModal(true)}>
                Nouveau produit
              </Button>
              <ModalProduit
                show={this.state.open}
                onHide={() => this.handleModal(false)}
                handleSubmit={this.handleSubmit}
                produit={this.state.produit}
                handleChange={this.handleChange}
                showNouveauProduit={this.state.showNouveauProduit}
              />

              <DeleteProduitModal
                show={this.state.openProduitModal}
                onHide={() => this.handleDeleteProduitModal(false)}
                deleteProduitDataBase={this.handleDeleteProduitDataBase}
              />
              {/* <ProduitModal
           show={this.state.open}
           onHide={() => this.handleModal(false)}
           handleSubmit={this.handleSubmit}
           //produit={this.state.produit}
           //handleChange={this.handleChange}
          /> */}
            </ButtonToolbar>
          </h2>
          <ProduitsListDataTable
            produits={produits}
            updateProduit={this.updateProduit}
            handleDeleteProduitModal={this.handleDeleteProduitModal}
          />
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    produits: state.firestore.ordered.produits,
    produitMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ajouterProduitDataBase: (produit) =>
      dispatch(ajouterProduitDataBase(produit)),
    updateProduitDataBase: (produit) =>
      dispatch(updateProduitDataBase(produit)),
    deleteProduitDataBase: (produit) =>
      dispatch(deleteProduitDataBase(produit)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
    ];
  })
)(Produit);
