import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import FacturesListDataTable from './FacturesListDataTable2';
import Spinner from '../layout/Spinner';
import SendFactureModal from './SendFactureModal';
import axios from 'axios';
import moment from 'moment';
import {
  updateFactureStatut,
  supprimerFacture,
} from '../../store/actions/factureActions.js';
import { clearFactureState } from '../../store/actions/alertActions.js';
import EnregistreFacturePayeModal from './EnregistreFacturePayeModal.js';
import SupprimerFactureModal from './SupprimerFactureModal.js';
import Alert from '../layout/Alert';
import { saveAs } from 'file-saver';
//import Alert from '../layout/Alert';
//import { Redirect } from 'react-router-dom';
const $ = require('jquery');

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
class FacturesList2 extends Component {
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      facture: null,
      refFacture: null,
      openEnregFacPayeModal: false,
      openSupprimerFactureModal: false,
      acomptesDeLaFactureAsupprimer: [],
      resMessageFromGenerateFacturePdfPostReq: '',
      messageType: 'error',
    };
  }
  selectEnregistreFacturePaye = (open, facture) => {
    this.setState({ openEnregFacPayeModal: open, facture });
  };
  createAndDownloadFacturePDF = (facture) => {
    //this.setState({ open, facture, refFacture: null });
    const acomptesDeLaFactureAgenerer = this.props.acomptes
      .filter((acompteUn) => acompteUn.factureId == facture.id)
      .map((acompteDeux) => {
        const acompte = {
          dateAcompte: moment(acompteDeux.dateAcompte.toDate()).format(
            'D-MM-YYYY'
          ),
          montantAcompte: acompteDeux.montantAcompte,
        };
        return acompte;
      });
    axios
      .post('/generateFacturePdf', {
        ...facture,
        dateFacture: moment(facture.dateFacture.toDate()).format('D-MM-YYYY'),
        dateEcheanceFacture: moment(
          facture.dateEcheanceFacture.toDate()
        ).format('D-MM-YYYY'),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
        acomptes: [...acomptesDeLaFactureAgenerer],
      })
      .then((res) => {
        console.log('bonjourna');
        console.log(res.data);
        //console.log(res.data);
        alert(res.data);
        return axios.get('fetch-facture-pdf', { responseType: 'blob' });
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'facture.pdf');
      })
      .catch((err) => {
        alert(
          `Erreur survenue lors de la génération et du téléchargement de la facture au format PDF, ${err.message}`
        );
      });
  };
  updateState = (open, facture) => {
    this.setState({ open, facture, refFacture: null });
    const acomptesDeLaFactureAgenerer = this.props.acomptes
      .filter((acompteUn) => acompteUn.factureId == facture.id)
      .map((acompteDeux) => {
        const acompte = {
          dateAcompte: moment(acompteDeux.dateAcompte.toDate()).format(
            'D-MM-YYYY'
          ),
          montantAcompte: acompteDeux.montantAcompte,
        };
        return acompte;
      });
    axios
      .post('/generateFacturePdf', {
        ...facture,
        dateFacture: moment(facture.dateFacture.toDate()).format('D-MM-YYYY'),
        dateEcheanceFacture: moment(
          facture.dateEcheanceFacture.toDate()
        ).format('D-MM-YYYY'),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
        acomptes: [...acomptesDeLaFactureAgenerer],
      })
      .then((res) => {
        console.log('bonjourna');
        console.log(res.data);
        //console.log(res.data);
        alert(res.data);
        return axios.get('fetch-facture-png');
      })
      .then((res) => {
        this.setState({ refFacture: res.data }, () =>
          console.log(this.state.refFacture)
        );
      })
      .catch((err) => {
        //dispatch({ type: 'CREATE_FACTURE_ERROR', err })
        /* (
          <Alert
            message={err.message + "\nle serveur Node.js ne fonctionne pas !"}
            messageType={'error'}
          />
        ).dialog(); */
        this.setState({
          resMessageFromGenerateFacturePdfPostReq: `Erreur survenue lors de la génération de la facture, ${err.message}`,
          messageType: 'error',
        });
      });
  };
  supprimerFactureDataBase = (facture) => {
    const { supprimerFactureDataBase, clearFactureState } = this.props;
    supprimerFactureDataBase(facture);
    this.setState({ openSupprimerFactureModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 2000);
  };
  factureAsupprimerSetState = (open, facture) => {
    const { acomptes } = this.props;
    const acomptesDeLaFactureAsupprimer = acomptes
      ? acomptes.filter((acompte) => acompte.factureId == facture.id)
      : [];
    this.setState({
      openSupprimerFactureModal: open,
      acomptesDeLaFactureAsupprimer,
      facture,
    });
  };
  enregistreFacturePayeDataBase = (facture, statutFacture) => {
    const { updateFactureStatut, clearFactureState } = this.props;
    updateFactureStatut(facture, statutFacture);
    this.setState({ openEnregFacPayeModal: false });
    window.setTimeout(function () {
      $('.alert')
        .fadeTo(500, 0)
        .slideUp(500, function () {
          clearFactureState();
          $(this).remove();
          //window.location.reload();
        });
    }, 2000);
    //return <Redirect to="/" />;
  };

  /*   updateState = (open, facture) => {
    this.setState({ open, facture, refFacture: null });
    axios
      .post('/generateFacturePdf')
      .then(() => axios.get('fetch-facture-png', { responseType: 'blob' }))
      .then(res => {
        console.log(res);
        const factureBlob = new Blob([res.data], { type: 'image/png' });
        this.setState({ refFacture: URL.createObjectURL(factureBlob) }, () =>
          console.log(this.state.refFacture)
        );
      });
  }; */
  handleModal = (data) => {
    this.setState({
      open: data,
      resMessageFromGenerateFacturePdfPostReq: null,
      messageType: null,
    });
  };

  render() {
    /* const display = {
      display: 'none'
    }; */
    //const width = { width: '100%' };
    console.log(this.props);
    const { factureMessage, messageType, factures } = this.props;
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

    var modal = this.state.facture ? (
      <SendFactureModal
        show={this.state.open}
        onHide={() => this.handleModal(false)}
        state={this.state}
        refFacture={this.state.refFacture}
      />
    ) : null;
    console.log(this.state.facture);
    if (factures) {
      return (
        <React.Fragment>
          {factureMessage ? (
            <Alert message={factureMessage} messageType={messageType} />
          ) : null}

          {/* {factureMessage ? (
            messageType === 'success' ? (
              <div
                class="alert alert-success alert-dismissible fade show"
                //style={{ left: '40%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Success! </strong>
                {factureMessage}.
              </div>
            ) : (
              <div
                class="alert alert-danger alert-dismissible fade show"
                //style={{ left: '50%', top: '10%', position: 'fixed' }}
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Error! </strong> {factureMessage}.
              </div>
            )
          ) : null} */}
          <div className="row margin-top">
            <br />
            <h2>Liste de vos factures</h2>
            <FacturesListDataTable
              factures={factures}
              updateState={this.updateState}
              selectEnregistreFacturePaye={this.selectEnregistreFacturePaye}
              factureAsupprimerSetState={this.factureAsupprimerSetState}
              createAndDownloadFacturePDF={this.createAndDownloadFacturePDF}
            />
            {modal}
            <EnregistreFacturePayeModal
              show={this.state.openEnregFacPayeModal}
              onHide={() => this.setState({ openEnregFacPayeModal: false })}
              enregistreFacturePayeDataBase={() =>
                this.enregistreFacturePayeDataBase(this.state.facture, 'payee')
              }
            />
            <SupprimerFactureModal
              show={this.state.openSupprimerFactureModal}
              onHide={() => this.setState({ openSupprimerFactureModal: false })}
              acomptesDeLaFactureAsupprimer={
                this.state.acomptesDeLaFactureAsupprimer
              }
              supprimerFactureDataBase={() =>
                this.supprimerFactureDataBase(this.state.facture)
              }
            />
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
        </React.Fragment>
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateFactureStatut: (facture, factureStatut) =>
      dispatch(updateFactureStatut(facture, factureStatut)),
    supprimerFactureDataBase: (facture) => dispatch(supprimerFacture(facture)),
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  const auth = state.firebase.auth;
  return {
    auth: auth,
    companyLogo: state.firebase.ordered && state.firebase.ordered[auth.uid],
    companyData: state.firebase.profile.companyData,
    factures: state.firestore.ordered.factures2,
    acomptes: state.firestore.ordered.acomptes,
    factureMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'factures2',
        where: [['authorId', '==', props.auth.uid]],
      },
      { collection: 'acomptes', where: [['authorId', '==', props.auth.uid]] },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }];
  })
)(FacturesList2);
