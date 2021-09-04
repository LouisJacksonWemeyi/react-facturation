import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
//import ClientFactureActionNewDataTable from './ClientFactureActionNewDataTable';
//import Spinner from '../layout/Spinner';
//import queryString from 'query-string';
import { saveAs } from 'file-saver';
import axios from 'axios';
import moment from 'moment';

class ClientFactureActionNew extends Component {
  createAndDownloadFacturePDF = (facture, acomptes) => {
    //this.setState({ open, facture, refFacture: null });
    console.log(acomptes);
    const acomptesDeLaFactureAgenerer = acomptes
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
        companyData: this.props.user.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
        acomptes: [...acomptesDeLaFactureAgenerer],
      })
      .then((res) => {
        console.log('bonjourna');
        console.log(res.data);
        //console.log(res.data);
        alert(res.data);
        return axios.get('/fetch-facture-pdf', { responseType: 'blob' });
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

  render() {
    const { factureToGenerate, acomptes, tr } = this.props;
    if (factureToGenerate && acomptes) {
      return (
        <tr id={'tr-' + tr.id.toString()} key={tr.id}>
          <td>
            {`${tr.numFacture}`}
            <br />
            Facture de Régularisation
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
            <a href="#">
              <i
                class="fas fa-file-download fa-w-12 fa-2x"
                style={{ color: 'gray' }}
                //onClick={() => this.props.selectFactureToDownloadModal(true, tr)}
                onClick={() => this.createAndDownloadFacturePDF(tr, acomptes)}
              ></i>
            </a>
            &nbsp;&nbsp;
            {/* <i class="fas fa-search fa-w-12 fa-2x"></i> */}
            <a
              href={'/clientFactureFinal/' + tr.id + '?authorId=' + tr.authorId}
            >
              <i
                class="fas fa-file-pdf fa-w-12 fa-2x"
                style={{ color: 'gray' }}
                //onClick={}
              ></i>
            </a>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.tr.authorId;
  const factureId = ownProps.tr.id;
  return {
    factureId: factureId,
    authorId: authorId,
    companyLogo: state.firebase.ordered && state.firebase.ordered[authorId],
    companyData: state.firebase.profile.companyData,
    factureToGenerate:
      state.firestore.ordered.factureToGenerate &&
      state.firestore.ordered.factureToGenerate,
    /*     acomptesDeLaFactureAgenerer: state.firestore.ordered.acomptes,
     */ uploadedFiles: state.firebase.ordered[factureId],
    user: state.firestore.ordered.user && state.firestore.ordered.user[0],
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'factures2',
        storeAs: 'factureToGenerate',
        doc: props.factureId,
      },
      /*  {
        collection: 'acomptes',
        where: [['factureId', '==', props.factureId]],
        storeAS: 'acomptesDeLaFactureAgenerer',
      }, */
      {
        collection: 'users',
        storeAs: 'user',
        doc: props.authorId,
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.authorId }, { path: props.factureId }];
  })
)(ClientFactureActionNew);
