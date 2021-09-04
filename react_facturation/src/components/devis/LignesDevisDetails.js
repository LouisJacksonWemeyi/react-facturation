import React, { Component } from 'react';
import LignesDevis from './LignesDevis';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import EditerClientModalDevis from './EditerClientModalDevis.js';
import EditerProduitModalDevis from './EditerProduitModalDevis.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';

class LignesDevisDetails extends Component {
  constructor(props) {
    super(props);
    const devis = this.props.devis;
    const lignesDevisCopy = [...devis.lignesDevis];
    console.log(devis);
    this.state = {
      devis: {
        id: devis.id,
        dateDevis: devis.dateDevis.toDate(),
        dateValiditeDevis: devis.dateValiditeDevis.toDate(),
        notesDevis: devis.notesDevis,
        numDevis: devis.numDevis,
        conditionDevis: devis.conditionDevis,
        montantDevis: devis.montantDevis,
        authorFirstName: devis.authorFirstName,
        authorId: devis.authorId,
        authorLastName: devis.authorLastName,
        client: { ...devis.client },
        lignesDevis: JSON.parse(JSON.stringify(devis.lignesDevis)),
        devisStatut: devis.devisStatut,
        createdAt: devis.createdAt,
        nomEntreprise: devis.nomEntreprise,
      },
      openEditerClientModalDevis: false,
      openEditerProduitModalDevis: false,
      indexLigneEditerProduitModalDevis: 0,
    };
  }
  onLigneDevisDelete = (ligneDevis, idx) => {
    if (idx !== 0) {
      let devis = { ...this.state.devis };
      let nouvellesLignesDevis = devis.lignesDevis.filter(
        (lignedevis, key) => key !== idx
      );
      devis.lignesDevis = nouvellesLignesDevis;
      this.setState({ devis }, () => console.log(this.state.devis.lignesDevis));
    } else {
      let devis = { ...this.state.devis };
      let nouvellesLignesDevis = devis.lignesDevis.filter(
        (ligneDevis, key) => key !== idx
      );
      nouvellesLignesDevis[idx].labelcacher = false;
      devis.lignesDevis = nouvellesLignesDevis;
      this.setState({ devis }, () => console.log(this.state.devis.lignesDevis));
    }
  };
  handleChange = (e) => {
    if (
      [
        'produit',
        'quantite',
        'unite',
        'prix',
        'reduction',
        'tva',
        'montant',
        'description',
      ].includes(e.target.name)
    ) {
      let lignesDevis = [...this.state.devis.lignesDevis];
      lignesDevis[e.target.dataset.id][e.target.name] = e.target.value;
      let devis = { ...this.state.devis };
      devis.lignesDevis = lignesDevis;
      this.setState({ devis }, () => console.log(this.state.devis.lignesDevis));
    } else if (
      [
        'nomClient',
        'adressClient',
        'paysClient',
        'numClient',
        'emailClient',
        'telephonClient',
        'numTvaClient',
      ].includes(e.target.name)
    ) {
      let devis = { ...this.state.devis };
      devis.client[e.target.name] = e.target.value;
      this.setState({ devis }, () => console.log(this.state.devis.client));
    } else {
      let devis = { ...this.state.devis };
      devis[e.target.name] = e.target.value;
      this.setState({ devis }, () => console.log(this.state.devis));
    }
    e.preventDefault();
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  /* handleEnregitrer = e => {
    this.props.createdevis2(this.state.devis);
    this.props.history.push('/');
    //this.setState({ redirecto: '/' });
  }; */
  handleNouvelleLigne = (e) => {
    let lignesDevis = [
      ...this.state.devis.lignesDevis,
      {
        produit: '',
        quantite: '1',
        unite: 'pièces',
        prix: '0',
        reduction: '0',
        tva: '12',
        montant: '',
        description: '',
        labelcacher: true,
        actionProduit: null,
      },
    ];
    let devis = { ...this.state.devis };
    devis.lignesDevis = lignesDevis;
    this.setState({ devis });
    e.preventDefault();
  };
  handleChangeDate = (data, date) => {
    let devis = { ...this.state.devis };
    devis[data] = date;
    this.setState({ devis }, () => console.log(this.state.devis));
  };
  handleSelectProduitLigneDevis = (ligneDevis, idx, produit) => {
    const devis = { ...this.state.devis };
    devis.lignesDevis[idx].produit = produit.nom;
    devis.lignesDevis[idx].description = produit.description;
    devis.lignesDevis[idx].unite = produit.unite;
    devis.lignesDevis[idx].prix = produit.netUnitSalesPrice;
    devis.lignesDevis[idx].tva = produit.rate;
    devis.lignesDevis[idx].produitId = produit.id;
    devis.lignesDevis[idx].authorId = produit.authorId;
    devis.lignesDevis[idx].createdAt = produit.createdAt;
    devis.lignesDevis[idx].sku = produit.sku;
    devis.lignesDevis[idx].actionProduit = 'Editer le produit';
    this.setState({ devis });
  };
  handleOnfocusOutInputProduitLigneDevis = (ligneDevis, idx) => {
    const devis = { ...this.state.devis };
    if (devis.lignesDevis[idx].produit) {
      if (devis.lignesDevis[idx].produitId) {
        this.setState({ devis });
      } else {
        devis.lignesDevis[idx].actionProduit = 'Enregistrer le produit';
        this.setState({ devis });
      }
    } else {
      if (devis.lignesDevis[idx].produitId) {
        devis.lignesDevis[idx].produitId = '';
        devis.lignesDevis[idx].description = '';
        devis.lignesDevis[idx].sku = '';
        devis.lignesDevis[idx].actionProduit = null;
        this.setState({ devis });
      } else {
        devis.lignesDevis[idx].actionProduit = null;
        this.setState({ devis });
      }
    }
    //this.setState({ devis });
  };
  handleSelectClient = (client) => {
    const devis = { ...this.state.devis };
    devis.client.clientId = client.id;
    devis.client.nomClient = client.nom;
    devis.client.adressClient = client.adresse;
    devis.client.paysClient = client.pays;
    devis.client.emailClient = client.email;
    devis.client.numClient = client.numClient;
    devis.client.telephonClient = client.telephone;
    devis.client.numTvaClient = client.numTva;
    devis.client.authorId = client.authorId;
    devis.client.createdAt = client.createdAt;
    devis.client.actionClient = 'Editer le client';
    devis.notesDevis = client.notes;
    this.setState({ devis });
    //this.setState({ devis, actionClient: 'Editer le client' });
  };
  handleOnfocusOutInputNomClient = () => {
    const devis = { ...this.state.devis };
    if (devis.client.nomClient) {
      if (devis.client.clientId) {
        devis.client.actionClient = 'Editer le client';
        this.setState({ devis });
        //this.setState({ devis, actionClient: 'Editer le client' });
      } else {
        devis.client.actionClient = 'Enregistrer le client';
        this.setState({ devis });
        //this.setState({ devis, actionClient: 'Enregistrer le client' });
      }
    } else {
      if (devis.client.clientId) {
        devis.client.clientId = '';
        devis.client.emailClient = '';
        devis.client.numClient = '';
        devis.client.telephonClient = '';
        devis.client.numTvaClient = '';
        devis.client.actionClient = null;
        this.setState({ devis });
        //this.setState({ devis, actionClient: null });
      } else {
        devis.client.actionClient = null;
        this.setState({ devis });
        //this.setState({ devis, actionClient: null });
      }
    }
    //this.setState({ devis });
  };

  handleOpenEditerProduitModalDevis = (open, idx) => {
    this.setState({
      openEditerProduitModalDevis: open,
      indexLigneEditerProduitModalDevis: idx,
    });
  };

  render() {
    const { devis } = this.state;
    console.log(devis);
    const { lignesDevis, client } = devis;
    //const id = this.props.id;
    const lignesDevisTva0Prcent = devis.lignesDevis.filter(
      (ligneDevis) => ligneDevis.tva == 0
    );
    const lignesDevisTva6Prcent = devis.lignesDevis.filter(
      (ligneDevis) => ligneDevis.tva == 6
    );
    const lignesDevisTva12Prcent = devis.lignesDevis.filter(
      (ligneDevis) => ligneDevis.tva == 12
    );
    const lignesDevisTva21Prcent = devis.lignesDevis.filter(
      (ligneDevis) => ligneDevis.tva == 21
    );

    const ligneSousTotalTva0Prcent = function () {
      console.log(lignesDevisTva0Prcent.length > 0);
      if (lignesDevisTva0Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva0Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 0 % ' +
                  'de ' +
                  lignesDevisTva0Prcent
                    .map(
                      (ligneDevis) =>
                        ligneDevis.quantite *
                        ligneDevis.prix *
                        (1 - ligneDevis.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesDevisTva0Prcent
                    .map(
                      (ligneDevis) =>
                        (ligneDevis.quantite *
                          ligneDevis.prix *
                          (100 - ligneDevis.reduction) *
                          ligneDevis.tva) /
                        10000
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };
    const ligneSousTotalTva6Prcent = function () {
      console.log(lignesDevisTva6Prcent.length > 0);
      if (lignesDevisTva6Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva6Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 6 % ' +
                  'de ' +
                  lignesDevisTva6Prcent
                    .map(
                      (ligneDevis) =>
                        ligneDevis.quantite *
                        ligneDevis.prix *
                        (1 - ligneDevis.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesDevisTva6Prcent
                    .map(
                      (ligneDevis) =>
                        (ligneDevis.quantite *
                          ligneDevis.prix *
                          (100 - ligneDevis.reduction) *
                          ligneDevis.tva) /
                        10000
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };
    const ligneSousTotalTva12Prcent = function () {
      console.log(lignesDevisTva12Prcent.length > 0);
      if (lignesDevisTva12Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva12Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 12 % ' +
                  'de ' +
                  lignesDevisTva12Prcent
                    .map(
                      (ligneDevis) =>
                        ligneDevis.quantite *
                        ligneDevis.prix *
                        (1 - ligneDevis.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesDevisTva12Prcent
                    .map(
                      (ligneDevis) =>
                        (ligneDevis.quantite *
                          ligneDevis.prix *
                          (100 - ligneDevis.reduction) *
                          ligneDevis.tva) /
                        10000
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };
    const ligneSousTotalTva21Prcent = function () {
      console.log(lignesDevisTva21Prcent.length > 0);
      if (lignesDevisTva21Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva21Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 21 % ' +
                  'de ' +
                  lignesDevisTva21Prcent
                    .map(
                      (ligneDevis) =>
                        ligneDevis.quantite *
                        ligneDevis.prix *
                        (1 - ligneDevis.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesDevisTva21Prcent
                    .map(
                      (ligneDevis) =>
                        (ligneDevis.quantite *
                          ligneDevis.prix *
                          (100 - ligneDevis.reduction) *
                          ligneDevis.tva) /
                        10000
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };
    return (
      <div>
        <form onSubmit={this.props.handleEnregitrer.bind(this, devis)}>
          <div>
            <Link to="/devis">
              <i class="far fa-arrow-alt-circle-left" /> Devis
            </Link>
          </div>
          <div className="clearfix mb-4">
            <div className="float-right">
              <button type="button" className="btn btn-outline-primary">
                <i class="fal fa-ellipsis-h-alt" /> °°°Plus
              </button>

              <button
                type="submit"
                className=" ml-2 btn btn-outline-primary"
                //onClick={() => this.props.handleEnregitrer(devis)} ne marche pas
              >
                Enregistrer
              </button>
              <button type="button" className=" ml-2 btn btn-outline-primary">
                <i class="fas fa-search" /> Afficher
              </button>
              <button type="button" className=" ml-2 btn btn-primary">
                Finaliser la devis
              </button>
            </div>
          </div>
          <div class="row">
            {' '}
            <h3 className="ml-3 float-left">Devis n°{devis.numDevis}</h3>
          </div>
          <div className="document-form">
            <div class="row">
              <div class="ml-n2 col-sm-8">
                {' '}
                <div className="col-sm-5">
                  <div class="form-group">
                    <label htmlFor="nomClient">Client</label>
                    <div className="input-group form-group">
                      <input
                        type="texte"
                        className="form-control border-right-0"
                        name="nomClient"
                        id="nomClient"
                        placeholder="Entrez ou sélectionner un client"
                        maxLength="200"
                        value={client.nomClient}
                        onBlur={this.handleOnfocusOutInputNomClient}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline dropdown-toggle border border-left-0"
                          data-toggle="dropdown"
                        />
                        <div className="dropdown-menu">
                          {this.props.clients
                            ? this.props.clients.map((client, idx) => {
                                return (
                                  <a
                                    className="dropdown-item"
                                    key={`${client.nom}-${idx}`}
                                    //href="#"
                                    onClick={() =>
                                      this.handleSelectClient(client)
                                    }
                                  >
                                    {client.nom}
                                  </a>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label htmlFor="adressClient">Adresse</label>
                    <textarea
                      className="form-control"
                      id="adressClient"
                      name="adressClient"
                      placeholder="Saisir l'adresse complète du client"
                      value={client.adressClient}
                      onChange={this.handleChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paysClient">Pays</label>
                    <input
                      type="text"
                      className="form-control"
                      id="pays"
                      placeholder="Saisir le pays du client"
                      maxLength="100"
                      name="paysClient"
                      value={client.paysClient}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <a
                    //href="#"
                    className="editerClient text-primary"
                    onClick={() => {
                      this.setState({ openEditerClientModalDevis: true });
                    }}
                  >
                    {
                      /* {client.nomClient
                      ? client.clientId
                        ? 'Editer le client'
                        : 'Enregistrer le client'
                      : null} */ this
                        .state.devis.client.actionClient
                    }
                  </a>
                </div>
              </div>
              <div class="ml-2 col-sm-4">
                <div className="row">
                  <div class="col form-group">
                    <label for="datedevis">Date de devis</label>
                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={devis.dateDevis}
                      onChange={this.handleChangeDate.bind(this, 'dateDevis')}
                    />
                    <i class="far fa-calendar-alt date-picker-icon">{''}</i>
                  </div>
                  <div class="col form-group">
                    <label htmlFor="numdevis">N° de devis</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numDevis"
                      value={devis.numDevis}
                      onChange={this.handleChange}
                      name="numDevis"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div class=" col form-group"></div>
                  <div class=" col form-group">
                    <label for="dateEcheancedevis">Validite</label>
                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={devis.dateValiditeDevis}
                      onChange={this.handleChangeDate.bind(
                        this,
                        'dateValiditeDevis'
                      )}
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon">{''}</i>
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="notesdevis">Notes</label>
                    <textarea
                      className="form-control"
                      id="notesdevis"
                      name="notesdevis"
                      value={devis.notesDevis}
                      onChange={this.handleChange}
                      placeholder="Rédigez un message pour le client"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <LignesDevis
              lignesDevis={lignesDevis}
              onLigneDevisDelete={this.onLigneDevisDelete}
              produits={this.props.produits}
              handleSelectProduitLigneDevis={this.handleSelectProduitLigneDevis}
              handleOpenEditerProduitModalDevis={
                this.handleOpenEditerProduitModalDevis
              }
              handleOnfocusOutInputProduitLigneDevis={
                this.handleOnfocusOutInputProduitLigneDevis
              }
              handleChange={this.handleChange}
            />
            <button
              className="btn btn-outline-primary my-2"
              onClick={this.handleNouvelleLigne}
            >
              Nouvelle ligne
            </button>
            {/* code total devis  */}
            <hr className="" />
            <div class="row">
              <div class="col" />
              <div class="col">
                <div class="row">
                  <div class="col">Sous-total</div>
                  <div class="col text-right">
                    {lignesDevis
                      .map(
                        (ligneDevis) =>
                          (ligneDevis.quantite *
                            ligneDevis.prix *
                            (100 - ligneDevis.reduction)) /
                          100
                      )
                      .reduce(function (a, b) {
                        return a + b;
                      })}
                  </div>
                </div>
                {ligneSousTotalTva0Prcent()}
                {ligneSousTotalTva6Prcent()}
                {ligneSousTotalTva12Prcent()}
                {ligneSousTotalTva21Prcent()}
                <div class="row">
                  <div class="col">
                    <h4>Montant Total EUR</h4>
                  </div>
                  <div class="col">
                    <div class="float-right">
                      {lignesDevis
                        .map(
                          (ligneDevis) =>
                            (ligneDevis.quantite *
                              ligneDevis.prix *
                              ((100 - ligneDevis.reduction) * ligneDevis.tva +
                                100 * (100 - ligneDevis.reduction))) /
                            10000
                        )
                        .reduce(function (a, b) {
                          return a + b;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="" />
            <div className="row">
              <div class="col form-group">
                <label for="conditionsDevis">
                  <h5>Conditions</h5>
                </label>
                <textarea
                  className="form-control"
                  id="conditionDevis"
                  name="conditionDevis"
                  value={devis.conditionDevis}
                  onChange={this.handleChange}
                  placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </form>
        <EditerClientModalDevis
          show={this.state.openEditerClientModalDevis}
          closeModal={() =>
            this.setState({ openEditerClientModalDevis: false })
          }
          clientEdit={this.state}
          selectClient={this.handleSelectClient}
        />
        <EditerProduitModalDevis
          show={this.state.openEditerProduitModalDevis}
          closeModal={() =>
            this.setState({ openEditerProduitModalDevis: false })
          }
          produitEdit={this.state}
          indexLigneEditerProduitModalDevis={
            this.state.indexLigneEditerProduitModalDevis
          }
          selectProduitLigneDevis={this.handleSelectProduitLigneDevis}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    produits: state.firestore.ordered && state.firestore.ordered.produits,
    clients: state.firestore.ordered && state.firestore.ordered.clients,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
    ];
  })
)(LignesDevisDetails);
