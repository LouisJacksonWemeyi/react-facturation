import React, { Component } from 'react';
//import LignesAcompte from './LignesAcompte';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
//import { DatePickerInput } from 'rc-datepicker';

//import 'rc-datepicker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/facturesCss/factureCreate.css';
import { updateAcompte } from '../../store/actions/acompteActions.js';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
//import Dropzone from 'react-dropzone';
import Alert from '../layout/Alert';
//import AcomptePreview from './AcomptePreview';
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';
import { compose } from 'redux';
//import EditerClientModal from '../factures/EditerClientModal.js';
//import moment from 'moment';
import Spinner from '../layout/Spinner';

const $ = require('jquery');

class AcompteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acompte: {
        dateAcompte: new Date(),
        dateValiditeAcompte: new Date(),
        notesAcompte: '',
        numAcompte: '',
        conditionAcompte: '',
        designationAcompte: '',
        montantAcompte: '0.00',
        client: {
          nomClient: '',
          adressClient: '',
          paysClient: '',
          numClient: '',
          emailClient: '',
          telephonClient: '',
          numTvaClient: '',
        },
      },
      linkToAcomptes: '',
      showSpinner: false,
    };
  }

  handleChange = (e) => {
    const acompte = { ...this.state.acompte };
    acompte[e.target.name] = e.target.value;
    this.setState({ acompte }, () => console.log(this.state.acompte));
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleEnregitrer = (e) => {
    this.setState({ showSpinner: true });
    const { acompte, linkToAcomptes } = this.state;
    const { clearFactureState, history, updateAcompte } = this.props;
    updateAcompte(acompte);
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          history.push(linkToAcomptes);
        });
    }, 4000);
    e.preventDefault();
  };

  handleChangeDate = (data, date) => {
    const acompte = { ...this.state.acompte };
    acompte[data] = date;
    this.setState({ acompte }, () => console.log(this.state.acompte));
  };

  componentWillReceiveProps(nextProps) {
    /*     const acompteEdit = nextProps.acompte ? nextProps.acompte : this.state.acompte;
    let linkToAcomptes = { ...this.state.linkToAcomptes };
    linkToAcomptes = nextProps.acompte
      ? '/facturesAcompte/facture/' + nextProps.acompte.factureId
      : '';
    const acompte = { ...this.state.acompte };
    acompte = acompteEdit;
    acompte.dateAcompte = acompteEdit.dateAcompte.toDate();
    acompte.dateValiditeAcompte = acompteEdit.dateValiditeAcompte.toDate();
    this.setState({
      acompte,
      linkToAcomptes,
    }); */

    const acompte = nextProps.acompte
      ? { ...nextProps.acompte }
      : { ...this.state.acompte };
    //const linkToAcomptes = { ...this.state.linkToAcomptes };
    const linkToAcomptes = nextProps.acompte
      ? '/facturesAcompte/facture/' + nextProps.acompte.factureId
      : '';
    //const acompte = { ...this.state.acompte };
    //acompte = acompteEdit;
    acompte.dateAcompte = acompte.dateAcompte.toDate();
    acompte.dateValiditeAcompte = acompte.dateValiditeAcompte.toDate();
    this.setState({ acompte, linkToAcomptes }, () => console.log(this.state));
  }

  render() {
    const { acompte, showSpinner, linkToAcomptes } = this.state;
    const { client } = acompte;
    const { acompteMessage, messageType } = this.props;
    //const Acomptes = this.props.Acomptes
    //const clients = this.props.clients?this.props.clients:null;
    //if (redirect) return <Redirect to={redirect} />;
    return (
      <div>
        {acompteMessage ? (
          <Alert message={acompteMessage} messageType={messageType} />
        ) : showSpinner ? (
          <Spinner />
        ) : null}
        <form onSubmit={this.handleEnregitrer}>
          <div>
            <Link to={linkToAcomptes}>
              <i class="far fa-arrow-alt-circle-left" /> acomptes
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
                Finaliser Acompte
              </button>
            </div>
          </div>

          <div className="row">
            <h2 className="ml-3 float-left mb-1">
              Acompte n°{acompte ? acompte.numAcompte : null}
            </h2>
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
                        //className="form-control border-right-0"
                        className="form-control"
                        name="nomClient"
                        id="nomClient"
                        placeholder="Entrez ou sélectionner un client"
                        maxLength="200"
                        value={client.nomClient}
                        readOnly={true}
                      />
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
                      rows="3"
                      readOnly={true}
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
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
              <div class="ml-2 col-sm-4">
                <div className="row">
                  <div class="col form-group">
                    <label for="dateAcompte">Date</label>
                    {/*  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                   /> */}

                    <DatePicker
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={acompte.dateAcompte}
                      onChange={this.handleChangeDate.bind(this, 'dateAcompte')}
                      required
                    />
                    <i class="far fa-calendar-alt date-picker-icon" />
                  </div>
                  <div class="col form-group">
                    <label htmlFor="numAcompte">Acompte n°</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numAcompte"
                      value={acompte.numAcompte}
                      onChange={this.handleChange}
                      name="numAcompte"
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
                    <label for="dateEcheanceAcompte">Date d'échéance</label>
                    <DatePicker
                      name="dateEcheanceAcompte"
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      selected={acompte.dateValiditeAcompte}
                      onChange={this.handleChangeDate.bind(
                        this,
                        'dateValiditeAcompte'
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
                    <label htmlFor="notesAcompte">Notes</label>
                    <textarea
                      className="form-control"
                      id="notesAcompte"
                      name="notesAcompte"
                      value={acompte.notesAcompte}
                      onChange={this.handleChange}
                      placeholder="Rédigez un message pour le client"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div className="d-flex ml-2" style={{ marginTop: '' }}>
              <div className="form-group">
                <label htmlFor="description">Désignation</label>
                <textarea
                  type="text"
                  rows="30"
                  cols="110"
                  maxLength="1500"
                  style={{
                    height: '37px',
                  }}
                  className="form-control"
                  name="designationAcompte"
                  placeholder="Description"
                  value={acompte.designationAcompte}
                  onChange={this.handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group flex-grow-1 ">
                <label htmlFor="montant">Montant(HT)</label>
                <input
                  type="text"
                  size="7"
                  className="form-control"
                  name="montantAcompte"
                  value={acompte.montantAcompte}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col" />
              <div class="col" />

              <div class="col">
                <div class="row">&nbsp;</div>
                <div class="row">
                  <div class="">
                    <h4>Total HT </h4>
                  </div>
                  <div class="col">
                    <div class="float-right">
                      <b>
                        {acompte.montantAcompte}
                        <span className="ml-1">€</span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  <div class="row">
                  <div class="" align="center">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div> */}

            <hr className="" />

            {/* debut code condition Acompte */}
            <div></div>
            <div className="row">
              <div class="col form-group">
                <label for="conditionsAcompte">
                  <h5>Conditions</h5>
                </label>
                <textarea
                  className="form-control"
                  id="conditionAcompte"
                  name="conditionAcompte"
                  value={acompte.conditionAcompte}
                  onChange={this.handleChange}
                  placeholder="Entre tes termes, conditions de paiement ou des remarques supplémentaires"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateAcompte: (acompte) => dispatch(updateAcompte(acompte)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state) => {
  const {
    firestore: { ordered },
  } = state;
  return {
    acompte: ordered.acompte && ordered.acompte[0],
    acompteMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'acomptes',
        storeAs: 'acompte',
        doc: props.match.params.id,
      },
    ];
  })
)(AcompteEdit);
