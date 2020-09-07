import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4');

class ProduitsListDataTable extends Component {
  state = { tableRows: this.props.produits };

  componentDidMount() {
    console.log(this.el);
    $(this.el).DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.produits !== prevProps.produits) {
      const tableRows = this.props.produits;
      this.setState({ tableRows });
    }
  }

  render() {
    const { tableRows } = this.state;
    console.log(tableRows);
    const tRow = tableRows.map((tr) => (
      <tr
        id={'tr-' + tr.id.toString()}
        key={tr.id}
        //onClick={()=>this.props.updateProduit(tr)}
      >
        <td>{tr.sku}</td>
        <td>{tr.nom}</td>
        <td>{tr.description}</td>
        <td>{tr.netUnitSalesPrice} €</td>
        <td>
          {/* <!-- Example single danger button --> */}
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div className="dropdown-menu">
              <a
                className="dropdown-item"
                onClick={() => this.props.updateProduit(tr)}
              >
                Ouvrir
              </a>
              <a
                className="dropdown-item"
                onClick={() => this.props.handleDeleteProduitModal(true, tr)}
              >
                Supprimer
              </a>
            </div>
          </div>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <table
          className="table table-hover table-striped table-bordered dataTable"
          id="tableSample"
          ref={(el) => (this.el = el)}
          //style={width}
        >
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{tRow}</tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default ProduitsListDataTable;
