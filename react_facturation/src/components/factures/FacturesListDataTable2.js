import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';

const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-bs4');
//<script>$(document).ready(function() {$('#tableSample').DataTable()});</script>;

// class TableBody extends Component {
//   /* constructor(props, context) {
//     super(props, context);
//      this.state = { isToggleOn: false };
//     this.updateBtn = this.updateBtn.bind(this);
//     this.handleCbox = this.handleCbox.bind(this);
//   } */

//   /* updateBtn(e) {
//     this.props.onUpd(e.target.dataset.item);
//   }

//   handleCbox() {
//     this.setState(prevState => ({
//       isToggleOn: !prevState.isToggleOn
//     }));
//     var cnt = $('#tableSample').find('input:checkbox[name=cbox]:checked');
//     if (cnt.length) {
//       $('#del_rowBtn').show();
//     } else {
//       $('#del_rowBtn').hide();
//     }
//     this.props.canHan();
//   }
//  */
//   render() {
//     const divStyle = {
//       margin: 0
//     };

//     return (
//       <tr id={'tr-' + this.props.TRs.id.toString()}>
//         <td>
//           {/* <div className="checkbox" style={divStyle}>
//             <label>
//               <input
//                 name="cbox"
//                 onChange={this.handleCbox}
//                 type="checkbox"
//                 id={'check_bx' + this.props.TRs.id}
//                 value={this.props.TRs.id}
//               />
//               &nbsp;{this.props.TRs.id}
//             </label>
//           </div> */}
//           {this.props.TRs.factureStatut}
//         </td>
//         <td>{this.props.TRs.facture.numFacture}</td>
//         <td>{this.props.TRs.client.nomClient}</td>
//         <td>{this.props.TRs.facture.dateFacture}</td>
//         <td>{this.props.TRs.facture.dateEcheanceFacture}</td>
//         <td>{this.props.TRs.facture.montantFacture}</td>

//         <td>
//           {/* <!-- Example single danger button --> */}
//           <div class="btn-group">
//             <button
//               type="button"
//               className="btn btn-danger dropdown-toggle"
//               data-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               Action
//             </button>
//             <div className="dropdown-menu">
//               <a className="dropdown-item" href="#">
//                 Action
//               </a>
//               <div className="dropdown-divider" />
//               <a className="dropdown-item" href="#">
//                 Action
//               </a>
//               <a className="dropdown-item" href="#">
//                 Another action
//               </a>
//               <a className="dropdown-item" href="#">
//                 Something else here
//               </a>
//               <div className="dropdown-divider" />
//               <a className="dropdown-item" href="#">
//                 Separated link
//               </a>
//             </div>
//           </div>

//           {/*  {this.state.isToggleOn ? (
//             <button disabled className="btn btn-xs btn-default">
//               Edit
//             </button>
//           ) : (
//             <button
//               onClick={this.updateBtn}
//               data-item={this.props.TRs.id}
//               className="btn btn-xs btn-default"
//             >
//               Edit
//             </button>
//           )} */}
//         </td>
//       </tr>
//     );
//   }
// }
class FacturesListDataTable2 extends Component {
  state = { TRs: this.props.factures };
  /* constructor(props, context) {
    super(props);

    this.state = {
      TRs: [
        {
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
          factureStatut: 'En cours',
          id: 1
        }
      ]
    };

    /* this.state = {
      TRs: [
        {
          id: 1,
          name: 'rock',
          desc: 'A form of solid matter that can break the head whoever hits'
        }
      ],
      UPD: []
    };
    this.deleteRow = this.deleteRow.bind(this);
    this.onAddForm = this.onAddForm.bind(this);
    this.delNrow = this.delNrow.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.cancelUpd = this.cancelUpd.bind(this);
    this.propcessUpd = this.propcessUpd.bind(this);
 */
  //} */
  // delete multiple data
  /*   deleteRow(z) {
    var array = this.state.TRs;
    var index = array.findIndex(e => e.id == z);
    array.splice(index, 1);
    this.setState({ TRs: array });
  }

  delNrow() {
    var cof = confirm('are you sure !!');
    if (cof) {
      const tbox = $('#tableSample').find('input:checkbox[name=cbox]:checked');
      var arr = [];
      tbox.each(function() {
        arr.push(parseInt($(this).val()));
      });
      for (var i = 0; i < arr.length; i++) {
        this.deleteRow(arr[i]);
      }
      $('#del_rowBtn').hide();
    }
  } // end of delete function

  // add form data
  onAddForm(formVal) {
    var ctr = this.state.TRs.length + 1;
    var Ndata = {
      id: ctr,
      name: formVal.name,
      desc: formVal.area
    };
    this.setState({ TRs: this.state.TRs.concat([Ndata]), UPD: {} });
  } // end add form function

  updateRow(x) {
    var array = this.state.TRs;
    var index = array.findIndex(e => e.id == x);
    this.setState({
      UPD: this.state.TRs[index]
    });
  }

  cancelUpd() {
    this.setState({ UPD: [] });
  }

  propcessUpd(formVal) {
    var obj = this.state.TRs;
    var index = obj.findIndex(e => e.id == formVal.id);
    obj[index] = formVal;
    this.setState({ TRs: obj, UPD: [] });
  } */

  componentDidMount() {
    //const { factures } = props;
    /*const facturess = factures && factures.map(tr => tr);
    this.setState({ TRs: facturess }); */
    //console.log(factures);
    /* if (factures) {
      this.setState({ TRs: factures });
    }  */
    //const { factures } = this.props;
    //const { factures } = this.props;
    //ref={(el) => (this.el = el)};
    console.log(this.el);
    $(this.el).DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
      order: [[1, 'desc']],
    });
    //console.log(this.state.TRs);
    //console.log(factures);
    /*  $(this.el).DataTable({
      //data: this.state.TRs,
      data: factures,
      columns: [{ data: 'factureStatut' }, { data: 'facture.numFacture' }]
    }) */
    //$('#tableSample').DataTable();
  }
  /*  componentWillUnmount() {
    $(this.el).DataTable().destroy(true);
  } */
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.factures !== prevProps.factures) {
      const TRs = this.props.factures;
      this.setState({ TRs });
    }
  }

  /* static getDerivedStateFromProps(props, state) {
    const { factures } = props;

    if (factures) {
      return { TRs: factures };
    }
    return null;
  } */
  render() {
    const display = {
      display: 'none',
    };
    const width = { width: '100%' };
    //const { factures } = this.props;
    const { TRs } = this.state;
    console.log(TRs);
    const factureStatut = function (facture) {
      if (facture.factureStatut === 'envoyee') {
        if (facture.dateEcheanceFacture.toDate() < new Date().getTime()) {
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
      } else if (facture.factureStatut === 'payee') {
        return (
          <i class="far fa-check-circle" style={{ color: 'green' }}>
            &nbsp;Payée
          </i>
        );
      } else if (facture.dateEcheanceFacture.toDate() < new Date().getTime()) {
        return (
          <i class="fas fa-exclamation-triangle" style={{ color: 'red' }}>
            &nbsp;En retard
          </i>
        );
      } else {
        return <span className="text-warning">{facture.factureStatut}</span>;
      }
    };
    //console.log(factures);
    const tRow =
      /* factures &&
      factures.map(tr => ( */
      TRs.map((tr) => (
        /*   <TableBody
        //onUpd={this.updateRow}
        TRs={tr}
        key={tr.id}
        //canHan={this.cancelUpd}
      /> */
        <tr id={'tr-' + tr.id.toString()} key={tr.id}>
          <td>
            {/* <div className="checkbox" style={divStyle}>
            <label>
              <input
                name="cbox"
                onChange={this.handleCbox}
                type="checkbox"
                id={'check_bx' + this.props.TRs.id}
                value={this.props.TRs.id}
              />
              &nbsp;{this.props.TRs.id}
            </label>
          </div> */}
            {factureStatut(tr)}
          </td>
          <td>{tr.numFacture}</td>
          <td>{tr.client.nomClient}</td>
          <td>{moment(tr.dateFacture.toDate()).format('D-MM-YYYY')}</td>
          <td>{moment(tr.dateEcheanceFacture.toDate()).format('D-MM-YYYY')}</td>
          <td>{tr.montantFacture}</td>
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
                  href={
                    tr.factureStatut === 'payee'
                      ? '/factureFinal/' + tr.id
                      : tr.factureStatut === 'envoyee'
                      ? '/factureFinal/' + tr.id
                      : '/facture/' + tr.id
                  }
                >
                  Ouvrir
                  {/* <Link to={'/facture/' + tr.id}>Ouvrir</Link> */}
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.props.updateState(true, tr)}
                >
                  Envoyer
                </a>

                {tr.factureStatut === 'payee' ? null : tr.factureStatut ===
                  'envoyee' ? (
                  <a
                    className="dropdown-item"
                    onClick={() =>
                      this.props.selectEnregistreFacturePaye(true, tr)
                    }
                  >
                    Enregistrer comme payée
                  </a>
                ) : null}

                {/* <a
                  className="dropdown-item"
                  onClick={() =>
                    this.props.selectEnregistreFacturePaye(true, tr)
                  }
                >
                  {tr.factureStatut === 'payee'
                    ? null
                    : 'Enregistrer comme payée'}
                </a> */}
                {/* <a className="dropdown-item" href="#"> */}

                {tr.factureStatut === 'payee' ? null : tr.factureStatut ===
                  'envoyee' ? null : (
                  <Link
                    className="dropdown-item"
                    to={'/facturesAcompte/facture/' + tr.id}
                  >
                    Ajouter facture d'acompte
                  </Link>
                )}

                {/* </a> */}

                {tr.devisId ? (
                  <Link
                    className="dropdown-item"
                    /* onClick={() => (
                  <Link to={'/facture/draft/fromDevis/' + tr.id} />
                )} */
                    to={
                      '/devisLieFacture/' +
                      tr.devisId +
                      '?numFacture=' +
                      tr.numFacture
                    }
                  >
                    Devis lié
                  </Link>
                ) : null}

                {tr.factureStatut !== 'payee' ? (
                  <a
                    className="dropdown-item"
                    //href="#"
                    onClick={() =>
                      this.props.factureAsupprimerSetState(true, tr)
                    }
                  >
                    Supprimer
                  </a>
                ) : null}

                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  onClick={() => this.props.createAndDownloadFacturePDF(tr)}
                  //href="#"
                >
                  Télécharger
                </a>
              </div>
            </div>

            {/*  {this.state.isToggleOn ? (
            <button disabled className="btn btn-xs btn-default">
              Edit
            </button>
          ) : (
            <button
              onClick={this.updateBtn}
              data-item={this.props.TRs.id}
              className="btn btn-xs btn-default"
            >
              Edit
            </button>
          )} */}
          </td>
        </tr>
      ));

    return (
      <div className="col-sm-12">
        {/* <div className="col-md-4">
          <AddFormData
            onAdd={this.onAddForm}
            upd={this.state.UPD}
            updcan={this.cancelUpd}
            propUpd={this.propcessUpd}
          />
        </div> */}
        {/* <div className="col-md-8"> */}
        {/* <div className="row h35">
            <div className="col-md-6">
              <button
                onClick={this.delNrow}
                id="del_rowBtn"
                className="btn btn-xs btn-default"
                style={display}
              >
                Delete in Row
              </button>
            </div>
            <div className="col-md-offset-2 col-md-4" />
          </div> */}
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
              <th>Echéance</th>
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

/* const FacturesList = () => {
  return (
    <div>
      FacturesList
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <form class="">
              <div class="row">
                <div class="form-group">
                  <label for="exampleInputEmail3">Name</label> <br />
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail3">Email address</label> <br />
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail3">Mobile</label> <br />
                  <input
                    type="tel"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="Mobile"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group">
                  <label for="exampleInputEmail3">State</label> <br />
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="State"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail3">City</label> <br />
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="City"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail3">Zip</label> <br />
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail3"
                    placeholder="Zip"
                  />
                </div>
              </div>
              <div class="row">
                <div class="" align="center">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}; */

/* const mapStateToProps = state => {
  console.log(state);
  return {
    factures: state.firestore.ordered.factures
  };
}; */

export default /* compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'factures' }])
) */ FacturesListDataTable2;
