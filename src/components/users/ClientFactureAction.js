import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import ClientFactureActionDataTable from './ClientFactureActionDataTable';
import Spinner from '../layout/Spinner';
import queryString from 'query-string';
import { saveAs } from 'file-saver';
import axios from 'axios';
import moment from 'moment';

class ClientFactureAction extends Component {
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
    const { factureToGenerate, acomptes } = this.props;
    if (factureToGenerate && acomptes) {
      return (
        <ClientFactureActionDataTable
          factureToGenerate={factureToGenerate}
          //acomptes={acomptes}
          createAndDownloadFacturePDF={this.createAndDownloadFacturePDF}
        />
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const authorId = queryString.parse(ownProps.location.search).authorId;
  const id = ownProps.match.params.id;
  return {
    id: id,
    authorId: authorId,
    companyLogo: state.firebase.ordered && state.firebase.ordered[authorId],
    companyData: state.firebase.profile.companyData,
    factureToGenerate:
      state.firestore.ordered.factureToGenerate &&
      state.firestore.ordered.factureToGenerate,
    acomptes: state.firestore.ordered.acomptes,
    uploadedFiles: state.firebase.ordered[id],
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
        doc: props.match.params.id,
      },
      {
        collection: 'acomptes',
        where: [['factureId', '==', props.match.params.id]],
      },
      {
        collection: 'users',
        storeAs: 'user',
        doc: props.authorId,
      },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.authorId }, { path: props.match.params.id }];
  })
)(ClientFactureAction);
