import React, { Component } from 'react';
import moment from 'moment';
import ClientFactureActionNew from './ClientFactureActionNew.js';
//import { Link } from 'react-router-dom';
//import ClientAccueil from './ClientAccueil';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';

const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4');

class ClientAccueilDataTableNew extends Component {
  state = {
    TRfacture: this.props.factures,
    TRacompte: this.props.acomptes,
    TRdevis: this.props.devis,
  };

  componentDidMount() {
    console.log(this.el);
    $(this.el).DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    });
  }

  render() {
    const { TRfacture, TRacompte, TRdevis } = this.state;
    //const width = { width: '100%' };
    console.log(TRfacture);
    const tRow = TRfacture.map((tr) => (
      /* {
      <tr id={'tr-' + tr.id.toString()} key={tr.id}>
        <td>
          <a
            href={'/clientFactureAction/' + tr.id + '?authorId=' + tr.authorId}
          >
            {`${tr.numFacture}`}
            <br />
            Facture de Régularisation
          </a>
        </td>

        <td>{tr.nomEntreprise}</td>
        <td>{tr.montantFacture} €</td>
        <td>{moment(tr.dateEcheanceFacture.toDate()).format('D-MM-YYYY')}</td>
        <td>
          {tr.factureStatut === 'payee' ? (
            <span>
              <i class="far fa-check-circle" style={{ color: 'green' }}></i>{' '}
              Payée
            </span>
          ) : (
            'A payer'
          )}
        </td>
         <td>
          <Link to="">
            <i
              class="fas fa-file-download fa-w-12 fa-2x"
              style={{ color: 'gray' }}
              //onClick={() => this.props.selectFactureToDownloadModal(true, tr)}
              onClick={() => this.props.createAndDownloadFacturePDF(true, tr)}
            ></i>
          </Link>
          &nbsp;&nbsp;
          <a href={'/factureFinal/' + tr.id}>
            <i
              class="fas fa-file-pdf fa-w-12 fa-2x"
              style={{ color: 'gray' }}
              //onClick={}
            ></i>
          </a>
        </td> 
      </tr>
    }*/ <ClientFactureActionNew
        id={'tr-' + tr.id.toString()}
        key={tr.id}
        tr={tr}
        acomptes={TRacompte}
      />
    ));

    const tRow2 = TRacompte.map((tr) => (
      <tr id={'tr-' + tr.id.toString()} key={tr.id}>
        <td>
          {`${tr.numAcompte}`}
          <br />
          Facture d'acompte
        </td>
        <td>{tr.nomEntreprise}</td>
        <td>{tr.montantAcompte} €</td>
        <td>{moment(tr.dateValiditeAcompte.toDate()).format('D-MM-YYYY')}</td>
        <td>
          {tr.acompteStatut === 'payee' ? (
            <span>
              <i class="far fa-check-circle" style={{ color: 'green' }}></i>{' '}
              Payée
            </span>
          ) : (
            'A payer'
          )}
        </td>
        <td>
          <i
            class="fas fa-file-download fa-w-12 fa-2x"
            style={{ color: 'gray' }}
          ></i>
          &nbsp;&nbsp;
          <a href={'/acompteFinal/' + tr.id}>
            <i
              class="fas fa-file-pdf fa-w-12 fa-2x"
              style={{ color: 'gray' }}
            ></i>
          </a>
        </td>
      </tr>
    ));
    const tRow3 = TRdevis.map((tr) => (
      <tr id={'tr-' + tr.id.toString()} key={tr.id}>
        <td>
          {`${tr.numDevis}`}
          <br />
          Devis
        </td>
        <td>{tr.nomEntreprise}</td>
        <td>{tr.montantDevis} €</td>
        <td>{moment(tr.dateValiditeDevis.toDate()).format('D-MM-YYYY')}</td>
        <td>
          {tr.devisStatut === 'accepte' ? (
            <span>
              <i class="far fa-check-circle" style={{ color: 'green' }}></i>{' '}
              accepté
            </span>
          ) : (
            'A valider'
          )}
        </td>
        <td>
          <i
            class="fas fa-file-download fa-w-12 fa-2x"
            style={{ color: 'gray' }}
            onClick={this.props.telecharger}
          ></i>
          &nbsp;&nbsp;
          <a href={'/devisFinal/' + tr.id}>
            <i
              class="fas fa-file-pdf fa-w-12 fa-2x"
              style={{ color: 'gray' }}
              //onClick={}
            ></i>
          </a>
        </td>
      </tr>
    ));

    return (
      <div className="col-sm-12">
        <h2>Vos Factures et devis</h2>
        <table
          className="table table-hover table-striped table-bordered dataTable"
          id="tableSample"
          ref={(el) => (this.el = el)}
          //style={width}
        >
          <thead>
            <tr>
              <th>Document n°</th>
              <th>Entreprise</th>
              <th>Montant</th>
              <th>Echéance</th>
              <th>Statut</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {tRow}
            {/* {TRfacture.map((tr) => (
              <ClientFactureActionNew
                id={'tr-' + tr.id.toString()}
                key={tr.id}
                tr={tr}
                acompte={this.props.acomptes}
              />
            ))} */}
            {tRow2}
            {tRow3}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ClientAccueilDataTableNew;
