import React, { Component } from 'react';
import LignesDevis from './LignesDevis';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { createDevis } from '../../store/actions/devisActions.js';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Alert from '../layout/Alert';
//import DevisPreview from './DevisPreview';
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';
import { compose } from 'redux';
import EditerClientModalDevis from './EditerClientModalDevis.js';
import EditerProduitModalDevis from './EditerProduitModalDevis.js';
import moment from 'moment';
import Spinner from '../layout/Spinner';

const $ = require('jquery');

class DevisCreate extends Component {
  constructor(props) {
    super(props);
    /* const nbrDevisOfThisYear = this.props.Deviss
      ? this.props.Deviss.filter(
          Devis => Devis.dateDevis.toDate().getFullYear() == 2019
        ).length + 1
      : 1; */
    this.state = {
      devis: {
        dateDevis: new Date(),
        dateValiditeDevis: new Date(),
        notesDevis: '',
        numDevis: '',
        conditionDevis: '',
        montantDevis: 'En cours de traitement',
        client: {
          nomClient: '',
          adressClient: '',
          paysClient: '',
          numClient: '',
          emailClient: '',
          telephonClient: '',
          numTvaClient: '',
          actionClient: null,
        },
        lignesDevis: [
          {
            produit: '',
            quantite: 1,
            unite: 'pièce(s)',
            prix: '0',
            reduction: '0',
            tva: '21',
            montant: '',
            description: '',
            labelcacher: false,
            actionProduit: null,
          },
        ],
        devisStatut: 'En cours',
        nomEntreprise: '',
      },
      fichiersDuDevis: [],
      openEditerClientModalDevis: false,
      openEditerProduitModalDevis: false,
      indexLigneEditerProduitModalDevis: 0,
      showSpinner: false,
    };
  }

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
    } else if (['fichiersDuDevis'].includes(e.target.name)) {
      let fichiersDuDevis = [...this.state.fichiersDuDevis, ...e.target.files];
      this.setState({ fichiersDuDevis }, () =>
        console.log(this.state.fichiersDuDevis)
      );
    } else {
      let devis = { ...this.state.devis };
      devis[e.target.name] = e.target.value;
      this.setState({ devis }, () => console.log(this.state.devis));
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleEnregitrer = (event) => {
    //traite le montant total du devis
    this.setState({ showSpinner: true });
    const devis = { ...this.state.devis };
    const montantDevis = devis.lignesDevis
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
      });
    devis.montantDevis = montantDevis;
    delete devis.client.authorId;
    delete devis.client.createdAt;
    devis.lignesDevis.map((ligneDevis) => {
      delete ligneDevis.authorId;
      delete ligneDevis.createdAt;
    });
    const { clearFactureState, history, createDevis } = this.props;
    createDevis(devis, this.state.fichiersDuDevis);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          history.push('/devis');
        });
    }, 4000);
    event.preventDefault();
  };
  handleNouvelleLigne = (e) => {
    const lignesDevis = [
      ...this.state.devis.lignesDevis,
      {
        produit: '',
        quantite: 1,
        unite: 'pièce(s)',
        prix: '0',
        reduction: '0',
        tva: '21',
        montant: '',
        description: '',
        labelcacher: true,
        actionProduit: null,
      },
    ];
    const devis = { ...this.state.devis };
    devis.lignesDevis = lignesDevis;
    this.setState({ devis });
    e.preventDefault();
  };
  onFilesDrop = (files) => {
    let fichiersDuDevis = [...this.state.fichiersDuDevis, ...files];
    this.setState({ fichiersDuDevis }, () =>
      console.log(this.state.fichiersDuDevis)
    );
  };
  handleChangeDate = (data, date) => {
    let devis = { ...this.state.devis };
    devis[data] = date;
    this.setState({ devis }, () => console.log(this.state.devis));
  };
  onFileDelete = (file, key) => {
    let fichiersDuDevis = [...this.state.fichiersDuDevis];
    const nouveauFichiersDuDevis = fichiersDuDevis.filter(
      (file, idx) => idx !== key
    );
    this.setState({ fichiersDuDevis: nouveauFichiersDuDevis }, () =>
      console.log(this.state.fichiersDuDevis)
    );
  };
  onLigneDevisDelete = (ligneDevis, idx) => {
    if (idx !== 0) {
      let devis = { ...this.state.devis };
      let nouvellesLignesDevis = devis.lignesDevis.filter(
        (ligneDevis, key) => key !== idx
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
    let devis = { ...this.state.devis };
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
    let devis = { ...this.state.devis };
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
  addDaysFunction = (date, nbJours) => {
    var startDate = date;
    //startDate = new Date(startDate.replace(/-/g, "/"));
    var endDate = '',
      noOfDaysToAdd = nbJours,
      count = 0;
    while (count < noOfDaysToAdd) {
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
        //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
        count++;
      }
    }
    return endDate;
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const companyData = nextProps.companyData
      ? nextProps.companyData
      : this.state.devis;
    const nbrDevisOfThisYear = nextProps.devis
      ? nextProps.devis.filter(
          (devis) =>
            devis.dateDevis.toDate().getFullYear() == new Date().getFullYear()
        ).length + 1
      : 1;
    console.log(nbrDevisOfThisYear);
    let devis = { ...this.state.devis };
    const dateDevis = devis.dateDevis;
    const conditionPaiement = nextProps.companyData
      ? nextProps.companyData.conditionPaiement
      : 0;
    devis.dateValiditeDevis = this.addDaysFunction(
      new Date(dateDevis),
      conditionPaiement
    );
    devis.numDevis = `${nbrDevisOfThisYear}-${moment(new Date()).format(
      'DD-MM-YYYY'
    )}`;
    devis.nomEntreprise = companyData.nomEntreprise;
    this.setState({ devis });
  }

  render() {
    const { devis, fichiersDuDevis, showSpinner } = this.state;
    console.log(devis);
    const { lignesDevis, client } = devis;
    const { devisMessage, messageType } = this.props;
    //const Deviss = this.props.Deviss
    //const clients = this.props.clients?this.props.clients:null;

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
        {devisMessage ? (
          <Alert message={devisMessage} messageType={messageType} />
        ) : showSpinner ? (
          <Spinner />
        ) : null}
        {/* {showSpinner ? (
          <Spinner />
        ) : (
          <Alert message={devisMessage} messageType={messageType} />
        )} */}
        <form onSubmit={this.handleEnregitrer}>
          <div>
            <Link to="/devis">
              <i class="far fa-arrow-alt-circle-left" /> Devis
            </Link>
          </div>
          <div className="clearfix mb-4">
            <div className="float-right">
              <button
                type="button"
                className="btn btn-outline-primary text-primary bg-white"
              >
                <i class="fal fa-ellipsis-h-alt" /> °°°Plus
              </button>

              <button
                type="submit"
                className=" ml-2 btn btn-outline-primary text-primary bg-white"
                //onClick={this.handleEnregitrer}
              >
                Enregistrer
              </button>
              <button
                type="button"
                className=" ml-2 btn btn-outline-primary text-primary bg-white"
              >
                <i class="fas fa-search" /> Afficher
              </button>
              <button type="button" className=" ml-2 btn btn-primary">
                Finaliser le Devis
              </button>
            </div>
          </div>

          <div className="row">
            <h2 className="ml-3 float-left mb-1">Nouveau devis</h2>
          </div>

          <div className="document-form">
            <div class="row">
              <div class="ml-n2 col-sm-8">
                {' '}
                <div className="col-sm-6">
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
                    <label for="dateDevis">Date</label>
                    {/*  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                   /> */}

                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={devis.dateDevis}
                      onChange={this.handleChangeDate.bind(this, 'dateDevis')}
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon" />
                  </div>
                  <div class="col form-group">
                    <label htmlFor="numDevis">Devis n°</label>
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
                  <div class=" col form-group">
                    {/* <label for="exampleFormControlInput1">Email address</label>
                    <br />
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    /> */}
                  </div>
                  <div class="col form-group">
                    <label for="dateEcheanceDevis">Validité</label>
                    <DatePicker
                      name="dateEcheanceDevis"
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={devis.dateValiditeDevis}
                      onChange={this.handleChangeDate.bind(
                        this,
                        'dateValiditeDevis'
                      )}
                      required
                    />
                    <span
                      class="far fa-calendar-alt date-picker-icon"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="notesDevis">Notes</label>
                    <textarea
                      className="form-control"
                      id="notesDevis"
                      name="notesDevis"
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
            {/*  <div class="row">
                  <div class="" align="center">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div> */}
            <button
              className="btn btn-outline-primary my-2"
              onClick={this.handleNouvelleLigne}
            >
              Nouvelle ligne
            </button>
            {/* code total Devis  */}
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
            {/* fin code total Devis */}
            <hr className="" />
            {/* debut code condition Devis */}
            <div></div>
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
            {/* fin code condition Devis */}
            <hr className="" />
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
            {/* debut code pièce jointe document à la Devis */}
            <div className="piecejointecontainerArea">
              <h5>Pièces Jointes</h5>
              <div className="devisUploadArea">
                <div className="piecejointecontainer">
                  <Dropzone
                    onDrop={(acceptedFiles) => this.onFilesDrop(acceptedFiles)}
                    noClick={true}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps({
                            className: 'dropzone',
                          })}
                        >
                          <input {...getInputProps()} />

                          <span class="btn btn-primary btn-file">
                            <i class="fa fa-paperclip" aria-hidden="true" />
                            <input
                              name="fichiersDuDevis"
                              type="file"
                              multiple={true}
                              onChange={this.handleChange}
                            />
                          </span>

                          <span>
                            &nbsp;&nbsp;Fais un glisser-déposer ou sélectionne
                            les fichiers à télécharger et à envoyer avec ton
                            devis.
                          </span>
                          <ul>
                            {fichiersDuDevis.map((file, key) => (
                              <li key={file.name + key}>
                                <div class="dropdown">
                                  <button
                                    class="btn btn-outline-primary my-2 dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <i
                                      class="fa fa-paperclip"
                                      aria-hidden="true"
                                    />{' '}
                                    <span>{file.name}</span>
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a class="dropdown-item" href="#">
                                      Action
                                    </a>
                                    <a class="dropdown-item" href="#">
                                      Another action
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      //href="#"
                                      onClick={() =>
                                        this.onFileDelete(file, key)
                                      }
                                    >
                                      Supprimer
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>
            {/*         <DevisPreview Devis={Devis} />
             */}
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createDevis: (devis, files) => dispatch(createDevis(devis, files)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    produits: state.firestore.ordered && state.firestore.ordered.produits,
    clients: state.firestore.ordered && state.firestore.ordered.clients,
    devis: state.firestore.ordered && state.firestore.ordered.devis,
    companyData:
      state.firestore.ordered.users &&
      state.firestore.ordered.users[0].companyData,
    devisMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'devis', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'users', doc: props.auth.uid },
    ];
  })
)(DevisCreate);
