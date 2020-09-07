import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4');

class AcompteListDataTable extends Component {
  state = { TRs: this.props.acomptes };
  componentDidMount() {
    console.log(this.el);
    $(this.el).DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
      order: [[1, 'desc']],
    });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.acomptes !== prevProps.acomptes) {
      const TRs = this.props.acomptes;
      this.setState({ TRs });
    }
  }
  render() {
    const display = {
      display: 'none',
    };
    const width = { width: '100%' };
    const { TRs } = this.state;
    console.log(TRs);

    const acompteStatut = function (acompte) {
      if (acompte.acompteStatut === 'envoyee') {
        if (acompte.dateValiditeAcompte.toDate() < new Date().getTime()) {
          return (
            <i class="fas fa-paper-plane" style={{ color: 'red' }}>
              &nbsp;Envoyée
            </i>
          );
        } else {
          return (
            <i class="fas fa-paper-plane" style={{ color: 'green' }}>
              &nbsp;Envoyée
            </i>
          );
        }
      } else if (acompte.acompteStatut === 'payee') {
        return (
          <i class="far fa-check-circle" style={{ color: 'green' }}>
            &nbsp;Payé
          </i>
        );
      } else if (acompte.dateValiditeAcompte.toDate() < new Date().getTime()) {
        return (
          <i class="fas fa-exclamation-triangle" style={{ color: 'red' }}>
            &nbsp;En retard
          </i>
        );
      } else {
        return <span className="text-warning">{acompte.acompteStatut}</span>;
      }
    };

    const tRow = TRs.map((tr) => (
      <tr id={'tr-' + tr.id.toString()} key={tr.id}>
        <td>{acompteStatut(tr)}</td>
        <td>{tr.numAcompte}</td>
        <td>{tr.client.nomClient}</td>
        <td>{moment(tr.dateAcompte.toDate()).format('D-MM-YYYY')}</td>
        <td>{moment(tr.dateValiditeAcompte.toDate()).format('D-MM-YYYY')}</td>
        <td>{tr.montantAcompte} €</td>
        <td>
          {/* <!-- Example single danger button --> */}
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Action
            </button>
            <div className="dropdown-menu">
              <Link
                className="dropdown-item"
                //onClick={() => this.props.handleOnClickOuvrirAcompte(tr)}
                to={
                  tr.acompteStatut == 'payee'
                    ? '/acompteFinal/' + tr.id
                    : tr.acompteStatut == 'envoyee'
                    ? '/acompteFinal/' + tr.id
                    : '/acompte/' + tr.id
                }
              >
                Ouvrir
                {/* <Link to={'/Acompte/' + tr.id}>Ouvrir</Link> */}
              </Link>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                //href="#"
                onClick={() => this.props.updateState(true, tr)}
              >
                Envoyer
              </a>
              {tr.acompteStatut === 'payee' ? null : tr.acompteStatut ===
                'envoyee' ? (
                <a
                  className="dropdown-item"
                  onClick={() =>
                    this.props.selectEnregistrerAcomptePaye(true, tr)
                  }
                >
                  Enregistrer comme payé
                </a>
              ) : null}
              {tr.acompteStatut !== 'payee' ? (
                <a
                  className="dropdown-item"
                  //href="#"
                  onClick={() => this.props.acompteAsupprimerSetState(true, tr)}
                >
                  Supprimer
                </a>
              ) : null}
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                //href="#"
                onClick={() => this.props.createAndDownloadAcomptePDF(tr)}
              >
                Télécharger
              </a>
            </div>
          </div>
        </td>
      </tr>
    ));

    return (
      <div className="col-sm-12">
        <table
          className="table table-hover table-striped table-bordered dataTable"
          id="tableSample"
          ref={(el) => (this.el = el)}
          style={width}
        >
          <thead>
            <tr>
              <th>Statut</th>
              <th>N°</th>
              <th>Client</th>
              <th>Date</th>
              <th>Échéance</th>
              <th>Montant</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{tRow}</tbody>
        </table>
        {/* </div> */}
      </div>
    );
  }
}
export default AcompteListDataTable;
