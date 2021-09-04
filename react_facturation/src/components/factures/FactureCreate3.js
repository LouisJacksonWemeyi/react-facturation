import React, { Component } from 'react';
import LignesFacture from './LignesFacture';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { createFacture2 } from '../../store/actions/factureActions';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Alert from '../layout/Alert';
//import FacturePreview from './FacturePreview';
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';
import { compose } from 'redux';
import moment from 'moment';
import EditerClientModalFacture from './EditerClientModalFacture.js';
import EditerProduitModalFacture from './EditerProduitModalFacture.js';
import Spinner from '../layout/Spinner';

const $ = require('jquery');

class FactureCreate3 extends Component {
  constructor(props) {
    super(props);
    /* const nbrFactureOfThisYear = this.props.factures
      ? this.props.factures.filter(
          facture => facture.dateFacture.toDate().getFullYear() == 2019
        ).length + 1
      : 1; */
    this.state = {
      facture: {
        dateFacture: new Date(),
        dateEcheanceFacture: new Date(),
        notesFacture: '',
        numFacture: '',
        conditionFacture: '',
        montantFacture: 'En cours de traitement',
        client: {
          nomClient: '',
          adressClient: '',
          paysClient: 'Belgique',
          numClient: '',
          emailClient: 'clientEmail@client.domain',
          telephonClient: '+32(0)222444555',
          numTvaClient: 'BE 0999999999',
          actionClient: null,
        },
        lignesFacture: [
          {
            produit: '',
            quantite: '1',
            unite: 'kg',
            prix: '0',
            reduction: '0',
            tva: '21',
            montant: '',
            description: '',
            labelcacher: false,
            actionProduit: null,
          },
        ],
        factureStatut: 'En cours',
        companyData: {},
        logoDataCompany: {},
      },
      fichiersDeLaFacture: [],
      openEditerClientModalFacture: false,
      openEditerProduitModalFacture: false,
      indexLigneEditerProduitModalFacture: 0,
      showSpinner: false,

      //actionClient: null,
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
      let lignesFacture = [...this.state.facture.lignesFacture];
      lignesFacture[e.target.dataset.id][e.target.name] = e.target.value;
      let facture = { ...this.state.facture };
      facture.lignesFacture = lignesFacture;
      this.setState({ facture }, () =>
        console.log(this.state.facture.lignesFacture)
      );
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
      let facture = { ...this.state.facture };
      facture.client[e.target.name] = e.target.value;
      this.setState({ facture }, () => console.log(this.state.facture.client));
    } else if (['fichiersDeLaFacture'].includes(e.target.name)) {
      /* const files = e.target.files;
      const fichiers = [];
      console.log(files);

      for (let i = 0, numFiles = files.length; i < numFiles; i++) {
        const file = files[i];
        fichiers.push(file);
      } */

      let fichiersDeLaFacture = [
        ...this.state.fichiersDeLaFacture,
        //...fichiers
        ...e.target.files,
      ];
      this.setState({ fichiersDeLaFacture }, () =>
        console.log(this.state.fichiersDeLaFacture)
      );
    } else {
      let facture = { ...this.state.facture };
      facture[e.target.name] = e.target.value;
      this.setState({ facture }, () => console.log(this.state.facture));
    }
    e.preventDefault();
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  /*handleEnregitrer = e => {
    html2canvas(document.getElementById('invoice')).then(canvas => {
      //document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('test.pdf');
    });

     const doc = new jsPDF();
    const element = document.getElementById('page');
    console.log(element);
    doc.fromHTML(element, 20, 20, {
      width: 500
    }); 
    doc.save('file.pdf');*/
  //console.log(doc.fromHTML(document.getElementById('invoice')));
  //const element = document.getElementById('invoice');
  //var doc = new jsPDF();
  /*   let fichiersDeLaFacture = [
      ...this.state.fichiersDeLaFacture,
      //...fichiers
      //...e.target.files
      //html2pdf().from(element)
      doc.fromHTML(element, 20, 20, { width: 500 })
    ];
    this.setState({ fichiersDeLaFacture }, () =>
      console.log(this.state.fichiersDeLaFacture)
    ); 
    //console.log(html2pdf().from(element));
    //doc.fromHTML(element, 20, 20, { width: 500 }).save('file.pdf');
    //console.log(doc.fromHTML(element, 20, 20, { width: 500 }).save('file.pdf'));
  };*/
  handleEnregistrer = (event) => {
    //traite le montant total de la facture
    this.setState({ showSpinner: true });
    const facture = { ...this.state.facture };
    const montantFacture = facture.lignesFacture
      .map(
        (ligneFacture) =>
          (ligneFacture.quantite *
            ligneFacture.prix *
            ((100 - ligneFacture.reduction) * ligneFacture.tva +
              100 * (100 - ligneFacture.reduction))) /
          10000
      )
      .reduce(function (a, b) {
        return a + b;
      });
    facture.montantFacture = montantFacture;
    delete facture.client.authorId;
    delete facture.client.createdAt;
    facture.lignesFacture.map((ligneFacture) => {
      delete ligneFacture.authorId;
      delete ligneFacture.createdAt;
    });
    const { createFacture2, clearFactureState, history } = this.props;
    createFacture2(facture, this.state.fichiersDeLaFacture);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          history.push('/');
        });
    }, 4000);
    event.preventDefault();
  };
  handleNouvelleLigne = (e) => {
    let lignesFacture = [
      ...this.state.facture.lignesFacture,
      {
        produit: '',
        quantite: '1',
        unite: 'kg',
        prix: '0',
        reduction: '0',
        tva: '21',
        montant: '',
        description: '',
        labelcacher: true,
        actionProduit: null,
      },
    ];
    let facture = { ...this.state.facture };
    facture.lignesFacture = lignesFacture;
    this.setState({ facture });
    e.preventDefault();
  };
  onFilesDrop = (files) => {
    let fichiersDeLaFacture = [
      ...this.state.fichiersDeLaFacture,
      //...fichiers
      ...files,
    ];
    this.setState({ fichiersDeLaFacture }, () =>
      console.log(this.state.fichiersDeLaFacture)
    );
  };
  handleChangeDate = (nameData, date) => {
    let facture = { ...this.state.facture };
    facture[nameData] = date;
    this.setState({ facture }, () => console.log(this.state.facture));
  };
  onFileDelete = (file, key) => {
    let fichiersDeLaFacture = [...this.state.fichiersDeLaFacture];
    const nouveauFichiersDeLaFacture = fichiersDeLaFacture.filter(
      (file, idx) => idx !== key
    );
    this.setState({ fichiersDeLaFacture: nouveauFichiersDeLaFacture }, () =>
      console.log(this.state.fichiersDeLaFacture)
    );
  };
  onLigneFactureDelete = (ligneFacture, idx) => {
    if (idx !== 0) {
      let facture = { ...this.state.facture };
      let nouvellesLignesFacture = facture.lignesFacture.filter(
        (ligneFacture, key) => key !== idx
      );
      facture.lignesFacture = nouvellesLignesFacture;
      this.setState({ facture }, () =>
        console.log(this.state.facture.lignesFacture)
      );
    } else {
      let facture = { ...this.state.facture };
      let nouvellesLignesFacture = facture.lignesFacture.filter(
        (ligneFacture, key) => key !== idx
      );
      nouvellesLignesFacture[idx].labelcacher = false;
      facture.lignesFacture = nouvellesLignesFacture;
      this.setState({ facture }, () =>
        console.log(this.state.facture.lignesFacture)
      );
    }
  };
  handleSelectProduitLigneFacture = (ligneFacture, idx, produit) => {
    const facture = { ...this.state.facture };
    facture.lignesFacture[idx].produit = produit.nom;
    facture.lignesFacture[idx].description = produit.description;
    facture.lignesFacture[idx].unite = produit.unite;
    facture.lignesFacture[idx].prix = produit.netUnitSalesPrice;
    facture.lignesFacture[idx].tva = produit.rate;
    facture.lignesFacture[idx].produitId = produit.id;
    facture.lignesFacture[idx].authorId = produit.authorId;
    facture.lignesFacture[idx].createdAt = produit.createdAt;
    facture.lignesFacture[idx].sku = produit.sku;
    facture.lignesFacture[idx].actionProduit = 'Editer le produit';
    this.setState({ facture });
  };
  handleOnfocusOutInputProduitLigneFacture = (ligneFacture, idx) => {
    let facture = { ...this.state.facture };
    if (facture.lignesFacture[idx].produit) {
      if (facture.lignesFacture[idx].produitId) {
        this.setState({ facture });
      } else {
        facture.lignesFacture[idx].actionProduit = 'Enregistrer le produit';
        this.setState({ facture });
      }
    } else {
      if (facture.lignesFacture[idx].produitId) {
        facture.lignesFacture[idx].produitId = '';
        facture.lignesFacture[idx].description = '';
        facture.lignesFacture[idx].sku = '';
        facture.lignesFacture[idx].actionProduit = null;
        this.setState({ facture });
      } else {
        facture.lignesFacture[idx].actionProduit = null;
        this.setState({ facture });
      }
    }
    this.setState({ facture });
  };
  handleSelectClient = (client) => {
    const facture = { ...this.state.facture };
    facture.client.clientId = client.id;
    facture.client.nomClient = client.nom;
    facture.client.adressClient = client.adresse;
    facture.client.paysClient = client.pays;
    facture.client.emailClient = client.email;
    facture.client.numClient = client.numClient;
    facture.client.telephonClient = client.telephone;
    facture.client.numTvaClient = client.numTva;
    facture.client.authorId = client.authorId;
    facture.client.createdAt = client.createdAt;
    facture.client.actionClient = 'Editer le client';
    facture.notesFacture = client.notes;
    this.setState({ facture });
    //this.setState({ facture, actionClient: 'Editer le client' });
  };

  handleOnfocusOutInputNomClient = () => {
    let facture = { ...this.state.facture };
    if (facture.client.nomClient) {
      if (facture.client.clientId) {
        facture.client.actionClient = 'Editer le client';
        this.setState({ facture });
        //this.setState({ facture, actionClient: 'Editer le client' });
      } else {
        facture.client.actionClient = 'Enregistrer le client';
        this.setState({ facture });
        //this.setState({ facture, actionClient: 'Enregistrer le client' });
      }
    } else {
      if (facture.client.clientId) {
        facture.client.clientId = '';
        facture.client.emailClient = '';
        facture.client.numClient = '';
        facture.client.telephonClient = '';
        facture.client.numTvaClient = 'BE';
        facture.client.actionClient = null;
        this.setState({ facture });
        //this.setState({ facture, actionClient: null });
      } else {
        facture.client.actionClient = null;
        this.setState({ facture });
        //this.setState({ facture, actionClient: null });
      }
    }
    //this.setState({ facture });
  };
  handleOpenEditerProduitModalFacture = (open, idx) => {
    this.setState({
      openEditerProduitModalFacture: open,
      indexLigneEditerProduitModalFacture: idx,
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
    const nbrFactureOfThisYear = nextProps.factures
      ? nextProps.factures.filter(
          (facture) =>
            facture.dateFacture.toDate().getFullYear() ===
            new Date().getFullYear()
        ).length + 1
      : 1;
    console.log(nbrFactureOfThisYear);
    const facture = { ...this.state.facture };
    const dateFacture = facture.dateFacture;
    console.log(dateFacture);
    const conditionPaiement = nextProps.companyData
      ? nextProps.companyData.conditionPaiement
      : 0;
    const companyData = nextProps.companyData
      ? nextProps.companyData
      : this.state.facture.companyData;
    const logoDataCompany = nextProps.logoDataCompany
      ? nextProps.logoDataCompany
      : this.state.facture.logoDataCompany;
    facture.dateEcheanceFacture = this.addDaysFunction(
      new Date(dateFacture),
      conditionPaiement
    );
    facture.numFacture = `${nbrFactureOfThisYear}-${moment(new Date()).format(
      'DD-MM-YYYY'
    )}`;
    facture.companyData = companyData;
    facture.logoDataCompany = logoDataCompany;
    this.setState({ facture });
  }
  /*componentDidUpdate = e => {
    let facture = { ...this.state.facture };
    const montantFacture = facture.lignesFacture
      .map(
        ligneFacture =>
          ligneFacture.quantite *
          ligneFacture.prix *
          ((100 - ligneFacture.reduction) / 100 + ligneFacture.tva / 100)
      )
      .reduce(function(a, b) {
        return a + b;
      });
    facture.montantFacture = montantFacture;
    this.setState({ facture });
  };*/

  render() {
    const { facture, fichiersDeLaFacture, showSpinner } = this.state;
    const { lignesFacture, client } = facture;
    //var client = { notes: facture.notesFacture };
    const { factureMessage, messageType, profile } = this.props;
    console.log(facture);
    console.log(client);

    //const factures = this.props.factures
    //const clients = this.props.clients?this.props.clients:null;

    const lignesFactureTva0Prcent = facture.lignesFacture.filter(
      (ligneFacture) => ligneFacture.tva == 0
    );
    const lignesFactureTva6Prcent = facture.lignesFacture.filter(
      (ligneFacture) => ligneFacture.tva == 6
    );
    const lignesFactureTva12Prcent = facture.lignesFacture.filter(
      (ligneFacture) => ligneFacture.tva == 12
    );
    const lignesFactureTva21Prcent = facture.lignesFacture.filter(
      (ligneFacture) => ligneFacture.tva == 21
    );

    const ligneSousTotalTva0Prcent = function () {
      console.log(lignesFactureTva0Prcent.length > 0);
      if (lignesFactureTva0Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva0Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 0 % ' +
                  'de ' +
                  lignesFactureTva0Prcent
                    .map(
                      (ligneFacture) =>
                        ligneFacture.quantite *
                        ligneFacture.prix *
                        (1 - ligneFacture.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesFactureTva0Prcent
                    .map(
                      (ligneFacture) =>
                        (ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction) *
                          ligneFacture.tva) /
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
      console.log(lignesFactureTva6Prcent.length > 0);
      if (lignesFactureTva6Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva6Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 6 % ' +
                  'de ' +
                  lignesFactureTva6Prcent
                    .map(
                      (ligneFacture) =>
                        ligneFacture.quantite *
                        ligneFacture.prix *
                        (1 - ligneFacture.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesFactureTva6Prcent
                    .map(
                      (ligneFacture) =>
                        (ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction) *
                          ligneFacture.tva) /
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
      console.log(lignesFactureTva12Prcent.length > 0);
      if (lignesFactureTva12Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva12Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 12 % ' +
                  'de ' +
                  lignesFactureTva12Prcent
                    .map(
                      (ligneFacture) =>
                        ligneFacture.quantite *
                        ligneFacture.prix *
                        (1 - ligneFacture.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesFactureTva12Prcent
                    .map(
                      (ligneFacture) =>
                        (ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction) *
                          ligneFacture.tva) /
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
      console.log(lignesFactureTva21Prcent.length > 0);
      if (lignesFactureTva21Prcent.length > 0) {
        return (
          <React.Fragment key="sousTotalHorsTva21Prcent">
            <div class="row">
              <div class="col">
                {'TVA ' +
                  ' 21 % ' +
                  'de ' +
                  lignesFactureTva21Prcent
                    .map(
                      (ligneFacture) =>
                        ligneFacture.quantite *
                        ligneFacture.prix *
                        (1 - ligneFacture.reduction / 100)
                    )
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
              <div class="col">
                <div class="float-right">
                  {lignesFactureTva21Prcent
                    .map(
                      (ligneFacture) =>
                        (ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction) *
                          ligneFacture.tva) /
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
    if (profile.role === 'user') {
      return <Redirect to={this.props.history.goBack()} />;
    }
    return (
      <div>
        {factureMessage ? (
          <Alert message={factureMessage} messageType={messageType} />
        ) : showSpinner ? (
          <Spinner />
        ) : null}
        {/* {showSpinner ? (
          <Spinner />
        ) : (
          <Alert message={factureMessage} messageType={messageType} />
        )} */}
        <form onSubmit={this.handleEnregistrer}>
          <div>
            <Link to="factures/show">
              <i class="far fa-arrow-alt-circle-left" /> Factures
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
                //onClick={this.handleEnregistrer}
                //onSubmit={this.handleSubmit}
              >
                Enregistrer
              </button>
              <button type="button" className=" ml-2 btn btn-outline-primary">
                <i class="fas fa-search" /> Afficher
              </button>
              <button type="button" className=" ml-2 btn btn-primary">
                Finaliser la facture
              </button>
            </div>
          </div>

          <div className="row">
            <h2 className="ml-3 float-left">Nouvelle facture</h2>
          </div>
          <div className="document-form">
            {/*   <div>
          <Link to="factures/show">
            <i class="far fa-arrow-alt-circle-left" /> Factures
          </Link>
          <hr />
        </div>
        <div className="clearfix mb-4">
          <h3 className="ml-1 float-left">Facture</h3>
          <div className="float-right">
            <button type="button" className="btn btn-outline-primary">
              <i class="fal fa-ellipsis-h-alt" /> °°°Plus
            </button>

            <button
              type="button"
              className=" ml-2 btn btn-outline-primary"
              onClick={this.handleEnregitrer}
            >
              Enregistrer
            </button>
            <button type="button" className=" ml-2 btn btn-outline-primary">
              <i class="fas fa-search" /> Afficher
            </button>
            <button type="button" className=" ml-2 btn btn-primary">
              Finaliser la facture
            </button>
          </div>
        </div> */}
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
                      //this.handleSelectClientModal(client);
                      this.setState({ openEditerClientModalFacture: true });
                    }}
                  >
                    {this.state.facture.client.actionClient}
                  </a>
                </div>
              </div>
              <div class="ml-2 col-sm-4">
                <div className="row">
                  <div class="col form-group">
                    <label for="dateFacture">Date de Facture</label>
                    {/*  <input
                  type="date"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                 /> */}

                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={facture.dateFacture}
                      onChange={this.handleChangeDate.bind(this, 'dateFacture')}
                      name="dateFacture"
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon" />
                  </div>
                  <div class="col form-group">
                    <label htmlFor="numFacture">N° de facture</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numFacture"
                      value={facture.numFacture}
                      name="numFacture"
                      onChange={this.handleChange}
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
                    <label for="dateEcheanceFacture">Date d'échéance</label>
                    <DatePicker
                      name="dateEcheanceFacture"
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={facture.dateEcheanceFacture}
                      onChange={this.handleChangeDate.bind(
                        this,
                        'dateEcheanceFacture'
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
                    <label htmlFor="notesFacture">Notes</label>
                    <textarea
                      className="form-control"
                      id="notesFacture"
                      name="notesFacture"
                      value={facture.notesFacture}
                      placeholder="Rédigez un message pour le client"
                      onChange={this.handleChange}
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <LignesFacture
              lignesFacture={lignesFacture}
              onLigneFactureDelete={this.onLigneFactureDelete}
              produits={this.props.produits}
              handleSelectProduitLigneFacture={
                this.handleSelectProduitLigneFacture
              }
              handleOpenEditerProduitModalFacture={
                this.handleOpenEditerProduitModalFacture
              }
              handleOnfocusOutInputProduitLigneFacture={
                this.handleOnfocusOutInputProduitLigneFacture
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
            {/* code total facture  */}
            <hr className="" />
            <div class="row">
              <div class="col" />
              <div class="col">
                <div class="row">
                  <div class="col">Sous-total</div>
                  <div class="col text-right">
                    {lignesFacture
                      .map(
                        (ligneFacture) =>
                          (ligneFacture.quantite *
                            ligneFacture.prix *
                            (100 - ligneFacture.reduction)) /
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
                      {lignesFacture
                        .map(
                          (ligneFacture) =>
                            (ligneFacture.quantite *
                              ligneFacture.prix *
                              ((100 - ligneFacture.reduction) *
                                ligneFacture.tva +
                                100 * (100 - ligneFacture.reduction))) /
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
            {/* fin code total facture */}
            <hr className="" />
            {/* debut code condition facture */}

            <div className="row">
              <div class="col form-group">
                <label for="conditionsFacture">Conditions</label>
                <textarea
                  className="form-control"
                  id="conditionFacture"
                  name="conditionFacture"
                  value={facture.conditionFacture}
                  placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                  onChange={this.handleChange}
                  rows="3"
                />
              </div>
            </div>
            {/* fin code condition facture */}
            <hr className="" />
            <EditerClientModalFacture
              show={this.state.openEditerClientModalFacture}
              closeModal={() =>
                this.setState({ openEditerClientModalFacture: false })
              }
              clientEdit={this.state}
              selectClient={this.handleSelectClient}
            />
            <EditerProduitModalFacture
              show={this.state.openEditerProduitModalFacture}
              closeModal={() =>
                this.setState({ openEditerProduitModalFacture: false })
              }
              produitEdit={this.state}
              indexLigneEditerProduitModalFacture={
                this.state.indexLigneEditerProduitModalFacture
              }
              selectProduitLigneFacture={this.handleSelectProduitLigneFacture}
            />
            {/* debut code pièce jointe document à la facture */}
            <div className="piecejointecontainerArea">
              <h5>Pièces jointes</h5>
              <div className="factureUploadArea">
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
                              name="fichiersDeLaFacture"
                              type="file"
                              multiple={true}
                              onChange={this.handleChange}
                            />
                          </span>

                          <span>
                            &nbsp;&nbsp;Fais un glisser-déposer ou sélectionne
                            les fichiers à télécharger et à envoyer avec ta
                            facture.
                          </span>
                          <ul>
                            {fichiersDeLaFacture.map((file, key) => (
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
            {/*         <FacturePreview facture={facture} />
             */}
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createFacture2: (facture, files) =>
      dispatch(createFacture2(facture, files)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    produits: state.firestore.ordered && state.firestore.ordered.produits,
    clients: state.firestore.ordered && state.firestore.ordered.clients,
    factures: state.firestore.ordered && state.firestore.ordered.factures2,
    companyData:
      state.firestore.ordered.users &&
      state.firestore.ordered.users[0].companyData,
    logoDataCompany: state.firebase.ordered && state.firebase.ordered[auth.uid],
    profile: state.firebase && state.firebase.profile,
    factureMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'factures2', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'users', doc: props.auth.uid },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }];
  })
)(FactureCreate3);
