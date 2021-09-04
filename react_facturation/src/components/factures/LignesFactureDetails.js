import React, { Component } from 'react';
import LignesFacture from './LignesFacture';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import moment from 'moment';
import EditerClientModalFacture from './EditerClientModalFacture.js';
import EditerProduitModalFacture from './EditerProduitModalFacture.js';

const $ = require('jquery');

//import { createFacture2 } from '../../store/actions/factureActions';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import Dropzone from 'react-dropzone';
// import Spinner from '../layout/Spinner';

class LignesFactureDetails extends Component {
  /*   constructor(props) {
    super(props);
    const facture = this.props.facture;
    facture.dateFacture = this.props.facture.dateFacture.toDate();
    facture.dateEcheanceFacture = this.props.facture.dateEcheanceFacture.toDate();
    this.state = {
      facture: facture
    };
  } */
  constructor(props) {
    super(props);
    const facture = this.props.facture;
    console.log(facture);
    const lignesFactureCopy = [...facture.lignesFacture];
    //JSON.parse(JSON.stringify(nestedArray))
    console.log(lignesFactureCopy);
    this.state = {
      facture: {
        id: facture.id,
        dateFacture: facture.dateFacture.toDate(),
        dateEcheanceFacture: facture.dateEcheanceFacture.toDate(),
        createdAt: facture.createdAt ? facture.createdAt : facture.dateFacture,
        notesFacture: facture.notesFacture,
        numFacture: facture.numFacture,
        conditionFacture: facture.conditionFacture,
        montantFacture: facture.montantFacture,
        authorFirstName: facture.authorFirstName,
        authorId: facture.authorId,
        authorLastName: facture.authorLastName,
        acomptesNotes: facture.acomptesNotes
          ? facture.acomptesNotes
          : `Ceci est un aperçu des acomptes qui vous ont été facturés au cours de la période de régularisation. Si certains de ces acomptes n’ont pas encore été payés, nous vous invitons à les payer dans les plus brefs délais. N’hésitez pas à consulter votre compte « MyFACDEV » pour connaitre le détail de votre situation.`,
        //client: facture.client,JSON.parse0JSON.stringify(numbers));

        client: { ...facture.client },
        //lignesFacture: facture.lignesFacture,
        lignesFacture: JSON.parse(JSON.stringify(facture.lignesFacture)),
        //lignesFacture: JSON.parse(JSON.stringify(lignesFactureCopy)),
        /*lignesFacture: [
          {
            produit: facture.lignesFacture[0]['produit'],
            quantite: facture.lignesFacture[0]['quantite'],
            unite: facture.lignesFacture[0]['unite'],
            prix: facture.lignesFacture[0]['prix'],
            reduction: facture.lignesFacture[0]['reduction'],
            tva: facture.lignesFacture[0]['tva'],
            montant: facture.lignesFacture[0]['montant'],
            description: facture.lignesFacture[0]['description'],
            labelcacher: facture.lignesFacture[0]['labelcacher']
          }
        ],*/
        factureStatut: facture.factureStatut,
        nomEntreprise: facture.nomEntreprise
          ? facture.nomEntreprise
          : 'JACKINFO',
        devisId: facture.devisId ? facture.devisId : null,
      },
      openEditerClientModalFacture: false,
      openEditerProduitModalFacture: false,
      indexLigneEditerProduitModalFacture: 0,
      //actionClient: null,
    };
  }
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
    } else {
      let facture = { ...this.state.facture };
      facture[e.target.name] = e.target.value;
      this.setState({ facture }, () => console.log(this.state.facture));
    }
    e.preventDefault();
  };
  handleSubmit = (facture, totalAcomptes, event) => {
    /* this.setState({ showSpinner: true });
    const { updateFactureDataBase, clearFactureState, history } = this.props;
    const facture = { ...this.state.facture };
    console.log(facture);

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
    console.log(facture);
    //updateFactureDataBase(facture);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          //clearFactureState();
          $(this).remove();
          history.push('/');
        });
    }, 4000); */
    this.props.handleEnregistrer(facture, totalAcomptes);
    event.preventDefault();
  };
  /* handleEnregitrer = e => {
    this.props.createFacture2(this.state.facture);
    this.props.history.push('/');
    //this.setState({ redirecto: '/' });
  }; */
  handleNouvelleLigne = (e) => {
    let lignesFacture = [
      ...this.state.facture.lignesFacture,
      {
        produit: '',
        quantite: '1',
        unite: 'pièces',
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
  handleChangeDate = (data, date) => {
    let facture = { ...this.state.facture };
    facture[data] = date;
    this.setState({ facture }, () => console.log(this.state.facture));
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

  render() {
    const { facture } = this.state;
    console.log(facture);
    const { lignesFacture, client } = facture;
    //const id = this.props.id;
    const acomptes = this.props.acomptes ? this.props.acomptes : [];
    const totalAcomptes =
      acomptes.length > 0
        ? acomptes
            .map((acompte) => acompte.montantAcompte * 1)
            .reduce(function (a, b) {
              return a + b;
            })
        : 0;
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
    const acomptesFactures = function (handleChange) {
      if (acomptes.length > 0) {
        return (
          <React.Fragment key="acomptesFactures">
            <div className="row">
              <div class="col form-group">
                <label>
                  <h5>Acomptes facturés</h5>
                </label>
                <div className="acomptes">
                  <div className="acomptesDetail">
                    <ul>
                      {acomptes.map((acompte) => (
                        <li key={`acompte-${acompte.numAcompte}`}>
                          <span>
                            {moment(acompte.dateAcompte.toDate()).format(
                              'D-MM-YYYY'
                            )}
                          </span>
                          <br />
                          {acompte.montantAcompte}
                        </li>
                      ))}
                    </ul>
                    <div className="acomptesTotal">
                      <div className="circle">
                        <p className="circle-content">
                          Total
                          <br />
                          {'€ ' +
                            acomptes
                              .map((acompte) => acompte.montantAcompte * 1)
                              .reduce(function (a, b) {
                                return a + b;
                              })}
                          <br />
                          HTVA
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="acomptesConditions">
                    <textarea
                      className="form-control"
                      id="acomptesNotes"
                      name="acomptesNotes"
                      value={facture.acomptesNotes}
                      onChange={handleChange}
                      //placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };

    const acomptesDejaFactures = function () {
      if (acomptes.length > 0) {
        return (
          <React.Fragment key="acomptesDejaFactures">
            <div class="row">
              <div class="col">Acomptes déjà facturés</div>
              <div class="col text-right">
                {'- ' +
                  acomptes
                    .map((acompte) => acompte.montantAcompte * 1)
                    .reduce(function (a, b) {
                      return a + b;
                    })}
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    };

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
    return (
      <div>
        <form
          onSubmit={(event) =>
            this.props.handleEnregistrer(facture, totalAcomptes, event)
          }
        >
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
                //onClick=
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
          <div class="row">
            {' '}
            <h3 className="ml-3 float-left">Facture n°{facture.numFacture}</h3>
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
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon">{''}</i>
                  </div>
                  <div class="col form-group">
                    <label htmlFor="numFacture">N° de facture</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numFacture"
                      value={facture.numFacture}
                      onChange={this.handleChange}
                      name="numFacture"
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
                  <div class=" col form-group">
                    <label for="dateEcheanceFacture">Date d'échéance</label>
                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={facture.dateEcheanceFacture}
                      onChange={this.handleChangeDate.bind(
                        this,
                        'dateEcheanceFacture'
                      )}
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon">{''}</i>
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
                      onChange={this.handleChange}
                      placeholder="Rédigez un message pour le client"
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
                {acomptesDejaFactures()}
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
                        }) - totalAcomptes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* fin code total facture */}
            <hr className="" />
            {acomptesFactures(this.handleChange)}
            {/* debut code condition facture */}
            {/* <div className="row">
              <div class="col form-group">
                <label>
                  <h5>Acomptes facturés</h5>
                </label>
                <div className="acomptes">
                  <div className="acomptesDetail">
                    <ul>
                      <li>
                        20/03/2018 <br /> 5,92
                      </li>
                      <li>
                        05/04/2018 <br />
                        8,30
                      </li>
                      <li>
                        04/05/2018 <br />
                        8,30
                      </li>
                      <li>
                        05/06/2018 <br />
                        8,30
                      </li>
                      <li>
                        04/07/2018 <br />
                        8,30
                      </li>
                      <li>
                        03/08/2018 <br />
                        8,30
                      </li>
                    </ul>
                    <div className="acomptesTotal">
                      <div className="circle">
                        <p className="circle-content">
                          Total
                          <br />
                          lllllllllll
                          <br />
                          jjiijkl
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="acomptesConditions">
                    <textarea
                      className="form-control"
                      id="acomptesConditions"
                      name="acomptesConditions"
                      value={facture.acomptesConditions}
                      //placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
 */}
            <div className="row">
              <div class="col form-group">
                <label for="conditionsFacture">
                  <h5>Conditions</h5>
                </label>
                <textarea
                  className="form-control"
                  id="conditionFacture"
                  name="conditionFacture"
                  value={facture.conditionFacture}
                  onChange={this.handleChange}
                  placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                  rows="3"
                />
              </div>
            </div>
            {/* fin code condition facture */}
            {/* <hr className="" /> */}
            {/* debut code pièce jointe document à la facture */}
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
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    produits: state.firestore.ordered && state.firestore.ordered.produits,
    clients: state.firestore.ordered && state.firestore.ordered.clients,
    acomptes: state.firestore.ordered && state.firestore.ordered.acomptes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'produits', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
      { collection: 'acomptes', where: [['factureId', '==', props.id]] },
    ];
  })
)(LignesFactureDetails);
