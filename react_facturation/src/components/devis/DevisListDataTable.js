import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4');

class DevisListDataTable extends Component {
  state = { TRs: this.props.devis };
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
    if (this.props.devis !== prevProps.devis) {
      const TRs = this.props.devis;
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
    const devisStatut = function (devis) {
      if (devis.devisStatut === 'envoyee') {
        if (devis.dateValiditeDevis.toDate() < new Date().getTime()) {
          return (
            <i class="fas fa-paper-plane" style={{ color: 'red' }}>
              &nbsp;Envoyé
            </i>
          );
        } else {
          return (
            <i class="fas fa-paper-plane" style={{ color: 'green' }}>
              &nbsp;Envoyé
            </i>
          );
        }
      } else if (devis.devisStatut === 'accepte') {
        return (
          <i class="far fa-check-circle" style={{ color: 'green' }}>
            &nbsp;Accepté
          </i>
        );
      } else if (devis.dateValiditeDevis.toDate() < new Date().getTime()) {
        return (
          <i class="fas fa-exclamation-triangle" style={{ color: 'red' }}>
            &nbsp;En retard
          </i>
        );
      } else {
        return <span className="text-warning">{devis.devisStatut}</span>;
      }
    };
    const tRow = TRs.map((tr) => (
      <tr id={'tr-' + tr.id.toString()} key={tr.id}>
        <td>{devisStatut(tr)}</td>
        <td>{tr.numDevis}</td>
        <td>{tr.client.nomClient}</td>
        <td>{moment(tr.dateDevis.toDate()).format('D-MM-YYYY')}</td>
        <td>{moment(tr.dateValiditeDevis.toDate()).format('D-MM-YYYY')}</td>
        <td>{tr.montantDevis} €</td>
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
              <a
                className="dropdown-item"
                //onClick={() => this.props.handleOnClickOuvrirDevis(tr)}
                href={
                  tr.devisStatut == 'accepte'
                    ? '/devisFinal/' + tr.id
                    : tr.devisStatut == 'envoyee'
                    ? '/devisFinal/' + tr.id
                    : '/devis/' + tr.id
                }
              >
                Ouvrir
                {/* <Link to={'/devis/' + tr.id}>Ouvrir</Link> */}
              </a>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                //href="#"
                onClick={() => this.props.updateState(true, tr)}
              >
                Envoyer
              </a>
              {tr.devisStatut === 'accepte' ? null : tr.devisStatut ===
                'envoyee' ? (
                <a
                  className="dropdown-item"
                  onClick={() =>
                    this.props.selectEnregistreDevisAccepte(true, tr)
                  }
                >
                  Enregistrer comme accepté
                </a>
              ) : null}
              <Link
                className="dropdown-item"
                /* onClick={() => (
                  <Link to={'/facture/draft/fromDevis/' + tr.id} />
                )} */
                to={'/facture/draft/fromDevis/' + tr.id}
              >
                {tr.devisStatut !== 'Facture' ? 'Convertir en facture' : null}
              </Link>
              {tr.devisStatut !== 'accepte' ? (
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.props.devisAsupprimerSetState(true, tr)}
                >
                  Supprimer
                </a>
              ) : null}
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                //href="#"
                onClick={() => this.props.createAndDownloadDevisPDF(tr)}
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
              <th>Validité</th>
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
export default DevisListDataTable;
