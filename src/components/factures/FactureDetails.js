import React, { Component } from 'react';
import LignesFacture from './LignesFacture';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { createFacture } from '../../store/actions/factureActions';
import { connect } from 'react-redux';

class FactureDetails extends Component {
  state = {
    facture: {
      dateFacture: new Date(),
      dateEcheanceFacture: new Date(),
      notesFacture: '',
      numFacture: '',
      conditionFacture: '',
      montantFacture: 'En cours de traitement'
    },
    client: {
      nomClient: '',
      adressClient: '',
      paysClient: '',
      numClient: '',
      emailClient: '',
      telephonClient: '',
      numTvaClient: ''
    },
    lignesFacture: [
      {
        produit: '',
        quantite: '',
        unite: '',
        prix: '',
        reduction: '',
        tva: '',
        montant: '',
        description: '',
        labelcacher: false
      }
    ],
    factureStatut: 'En cours'
  };
  handleChange = e => {
    if (
      [
        'produit',
        'quantite',
        'unite',
        'prix',
        'reduction',
        'tva',
        'montant',
        'description'
      ].includes(e.target.name)
    ) {
      let lignesFacture = [...this.state.lignesFacture];
      lignesFacture[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ lignesFacture }, () =>
        console.log(this.state.lignesFacture)
      );
    } else if (
      [
        'nomClient',
        'adressClient',
        'paysClient',
        'numClient',
        'emailClient',
        'telephonClient',
        'numTvaClient'
      ].includes(e.target.name)
    ) {
      let client = { ...this.state.client };
      client[e.target.name] = e.target.value;
      this.setState({ client }, () => console.log(this.state.client));
    } else {
      let facture = { ...this.state.facture };
      facture[e.target.name] = e.target.value;
      this.setState({ facture }, () => console.log(this.state.facture));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  handleEnregitrer = e => {
    this.props.createFacture(this.state);
  };
  handleNouvelleLigne = e => {
    let lignesFacture = [
      ...this.state.lignesFacture,
      {
        produit: '',
        quantite: '',
        unite: '',
        prix: '',
        reduction: '',
        tva: '',
        montant: '',
        description: '',
        labelcacher: true
      }
    ];
    this.setState({ lignesFacture });
  };
  handleChangeDate = (data, date) => {
    let facture = { ...this.state.facture };
    facture[data] = date;
    this.setState({ facture }, () => console.log(this.state.facture));
  };
  static getDerivedStateFromProps(props, state) {
    const { facture } = props;

    if (facture) {
      return {
        //facture: facture.facture,
        client: facture.client,
        lignesFacture: facture.lignesFacture,
        factureStatut: facture.factureStatut
      };
    }
    return null;
  }
  render() {
    console.log(this.props);
    const id = this.props.match.params.id;
    const { lignesFacture, client, facture } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div>
            <Link to="factures/show">
              <i class="far fa-arrow-alt-circle-left" /> Factures
            </Link>
            <hr />
          </div>
          <div className="clearfix mb-4">
            <h3 className="ml-1 float-left">Facture-{id}</h3>
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
          </div>
          <div class="row">
            <div class="ml-n2 col-sm-8">
              {' '}
              <div className="col-sm-5">
                <div class="form-group">
                  <label htmlFor="nomClient">Client</label>
                  <input
                    type="texte"
                    className="form-control"
                    name="nomClient"
                    id="nomClient"
                    placeholder="Entrez ou sélectionner un client"
                    maxLength="200"
                    value={client.nomClient}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="adressClient">Adresse</label>
                  <textarea
                    className="form-control"
                    id="adressClient"
                    name="adressClient"
                    placeholder="Saisir l'adresse complète du client"
                    value={client.adressClient}
                    rows="3"
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
                  />
                </div>
                <a href="#" className="editerClient">
                  Editer le client
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
                    name="numFacture"
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
                    placeholder="Rédigez un message pour le client"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <LignesFacture lignesFacture={lignesFacture} />
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
                <div class="col">left</div>
                <div class="col text-right">
                  inline content needs to be right aligned
                </div>
              </div>
              <div class="row">
                <div class="col">left</div>
                <div class="col">
                  <div class="float-right">
                    element needs to be right aligned
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">left</div>
                <div class="col">
                  <div class="float-right">
                    element needs to be right aligned
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
                rows="3"
              />
            </div>
          </div>
          {/* fin code condition facture */}
          <hr className="" />
          {/* debut code pièce jointe document à la facture */}
          <div className="">
            <h5>Pièces jointes</h5>
            <div className="piecejointecontainer">
              <span class="btn btn-primary btn-file">
                <i class="fa fa-paperclip" aria-hidden="true" />{' '}
                <input type="file" multiple="true" />
              </span>
              &nbsp;&nbsp;Fais un glisser-déposer ou sélectionne les fichiers à
              télécharger et à envoyer avec ta facture.
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createFacture: facture => dispatch(createFacture(facture))
  };
};
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const factures = state.firestore.data.factures;
  const facture = factures ? factures[id] : null;
  return {
    facture: facture
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'factures' }])
)(FactureDetails);
