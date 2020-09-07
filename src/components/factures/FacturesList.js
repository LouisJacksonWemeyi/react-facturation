import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import FacturesListDataTable from './FacturesListDataTable';
import Spinner from '../layout/Spinner';

/* const $ = require('jquery');
$.DataTable = require('datatables.net'); */
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
class FacturesList extends Component {
  //state = { TRs: [] };
  /*   constructor(props, context) {
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

  /*componentDidUpdate(prevProps) {
    //const { factures } = props;
    /*const facturess = factures && factures.map(tr => tr);
    this.setState({ TRs: facturess }); */
  //console.log(factures);
  /* if (factures) {
      this.setState({ TRs: factures });
    }  */
  //const { factures } = this.props;
  /* if (this.props.factures !== prevProps.factures) {
      this.fetchData(this.props.factures);
    }
    const { factures } = this.props;
    console.log(this.el); */
  //console.log(this.state.TRs);
  //console.log(factures);
  /*  $(this.el).DataTable({
      //data: this.state.TRs,
      data: factures,
      columns: [{ data: 'factureStatut' }, { data: 'facture.numFacture' }]
    }); */

  //$('#tableSample').DataTable();
  //}*/

  /* static getDerivedStateFromProps(props, state) {
    const { factures } = props;

    if (factures) {
      return { TRs: factures };
    }
    return null;
  } */
  render() {
    /*   const display = {
      display: 'none'
    }; */
    //const width = { width: '100%' };
    const { factures } = this.props;
    //const { TRs } = this.state;
    //console.log(factures);
    // const tRow =
    //   factures &&
    //   factures.map(tr => (
    //     /*   <TableBody
    //     //onUpd={this.updateRow}
    //     TRs={tr}
    //     key={tr.id}
    //     //canHan={this.cancelUpd}
    //   /> */
    //     <tr id={'tr-' + tr.id.toString()} key={tr.id}>
    //       <td>
    //         {/* <div className="checkbox" style={divStyle}>
    //         <label>
    //           <input
    //             name="cbox"
    //             onChange={this.handleCbox}
    //             type="checkbox"
    //             id={'check_bx' + this.props.TRs.id}
    //             value={this.props.TRs.id}
    //           />
    //           &nbsp;{this.props.TRs.id}
    //         </label>
    //       </div> */}
    //         {tr.factureStatut}
    //       </td>
    //       <td>{tr.facture.numFacture}</td>
    //       <td>{tr.client.nomClient}</td>
    //       <td>{tr.facture.dateFacture.Date}</td>
    //       <td>{tr.facture.dateEcheanceFacture.Date}</td>
    //       <td>{tr.facture.montantFacture}</td>

    //       <td>
    //         {/* <!-- Example single danger button --> */}
    //         <div className="btn-group">
    //           <button
    //             type="button"
    //             className="btn btn-danger dropdown-toggle"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Action
    //           </button>
    //           <div className="dropdown-menu">
    //             <a className="dropdown-item" href="#">
    //               Action
    //             </a>
    //             <div className="dropdown-divider" />
    //             <a className="dropdown-item" href="#">
    //               Action
    //             </a>
    //             <a className="dropdown-item" href="#">
    //               Another action
    //             </a>
    //             <a className="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //             <div className="dropdown-divider" />
    //             <a className="dropdown-item" href="#">
    //               Separated link
    //             </a>
    //           </div>
    //         </div>

    //         {/*  {this.state.isToggleOn ? (
    //         <button disabled className="btn btn-xs btn-default">
    //           Edit
    //         </button>
    //       ) : (
    //         <button
    //           onClick={this.updateBtn}
    //           data-item={this.props.TRs.id}
    //           className="btn btn-xs btn-default"
    //         >
    //           Edit
    //         </button>
    //       )} */}
    //       </td>
    //     </tr>
    //   ));
    if (factures) {
      return (
        <div className="row margin-top">
          <iframe
            style="display: block; overflow: hidden; width: 100%; height: 3413px;"
            frameborder="0"
            scrolling="no"
            height="0"
            data-src="https://app.debitoor.com/printify.html#/draftInvoice/5e67c57e987b190020f1a80d?type=draftInvoice"
          ></iframe>
          <FacturesListDataTable factures={factures} />
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
          {/* <table
            className="table table-hover table-striped table-bordered"
            id="tableSample"
            ref={el => (this.el = el)}
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
          </table> */}
          {/* </div> */}
        </div>
      );
    } else {
      return <Spinner />;
    }
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

const mapStateToProps = state => {
  console.log(state);
  return {
    factures: state.firestore.ordered.factures
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'factures' }])
)(FacturesList);
