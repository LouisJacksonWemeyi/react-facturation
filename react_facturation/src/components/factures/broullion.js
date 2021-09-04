import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateFactureStatut } from '../../store/actions/factureActions.js';
import Spinner from '../layout/Spinner';
import EnregistreFacturePayeModal from './EnregistreFacturePayeModal.js';
import FacturesListDataTable from './FacturesListDataTable2';
import SendFactureModal from './SendFactureModal';

class FacturesList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      facture: null,
      refFacture: null,
      openEnregFacPayeModal: false,
    };
  }
  selectEnregistreFacturePaye = (open, facture) => {
    this.setState({ openEnregFacPayeModal: open, facture });
  };
  updateState = (open, facture) => {
    this.setState({ open, facture, refFacture: null });
    axios
      .post('/generateFacturePdf', {
        ...facture,
        dateFacture: moment(facture.dateFacture.toDate()).format('D-MM-YYYY'),
        dateEcheanceFacture: moment(
          facture.dateEcheanceFacture.toDate()
        ).format('D-MM-YYYY'),
        companyData: this.props.companyData,
        companyLogo: this.props.companyLogo[0].value.downloadURL,
      })
      .then((res) => {
        return axios.get('fetch-facture-png');
      })
      .then((res) => {
        this.setState({ refFacture: res.data }, () =>
          console.log(this.state.refFacture)
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  handleModal = (data) => {
    this.setState({ open: data });
  };

  render() {
    var modal = this.state.facture ? (
      <SendFactureModal
        show={this.state.open}
        onHide={() => this.handleModal(false)}
        facture={this.state.facture}
        refFacture={this.state.refFacture}
      />
    ) : null;
    console.log(this.state.facture);
    if (factures) {
      return (
        <div className="row margin-top">
          <FacturesListDataTable
            factures={factures}
            updateState={this.updateState}
            selectEnregistreFacturePaye={this.selectEnregistreFacturePaye}
          />
          {modal}
          <EnregistreFacturePayeModal
            show={this.state.openEnregFacPayeModal}
            onHide={() => this.setState({ openEnregFacPayeModal: false })}
            EnregistreFacturePayeDataBase={() =>
              this.props.updateFactureStatut(this.state.facture, 'payee')
            }
          />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFactureStatut: (facture, factureStatut) =>
      dispatch(updateFactureStatut(facture, factureStatut)),
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
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'factures2', where: [['authorId', '==', props.auth.uid]] },
    ];
  }),
  firebaseConnect((props) => {
    return [{ path: props.auth.uid }];
  })
)(FacturesList2);

{
  lignesFacture.map((ligneFacture, idx) => {
    if (ligneFacture.tva) {
      return (
        <React.Fragment key={idx}>
          <div class="row">
            <div class="col">
              {'TVA ' +
                ligneFacture.tva +
                ' % ' +
                'de ' +
                ligneFacture.quantite *
                  ligneFacture.prix *
                  (1 - ligneFacture.reduction / 100)}
            </div>
            <div class="col">
              <div class="float-right">
                {(ligneFacture.quantite *
                  ligneFacture.prix *
                  (100 - ligneFacture.reduction) *
                  ligneFacture.tva) /
                  10000}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  });
}
onLigneFactureDelete = (ligneFacture, idx) => {
  let facture = { ...this.state.facture };
  let nouvellesLignesFacture = facture.lignesFacture.filter(
    (ligneFacture, key) => key !== idx
  );
  facture.lignesFacture = nouvellesLignesFacture;
  this.setState({ facture }, () =>
    console.log(this.state.facture.lignesFacture)
  );
};
const montantFacture = facture.lignesFacture
  .map(
    (ligneFacture) =>
      (ligneFacture.quantite *
        ligneFacture.prix *
        ((100 - ligneFacture.reduction) * ligneFacture.tva +
          100 * (100 - ligneFacture.reduction))) /
      10000
  )
  .reduce(function (a, b) {
    return a + b;
  });
const lignesFactureTva0Prcent = facture.lignesFacture.filter(
  (ligneFacture) => ligneFacture.tva == 0
);
const lignesFactureTva6Prcent = facture.lignesFacture.filter(
  (ligneFacture) => ligneFacture.tva == 6
);
const lignesFactureTva12Prcent = facture.lignesFacture.filter(
  (ligneFacture) => ligneFacture.tva == 12
);
const lignesFactureTva21Prcent = facture.lignesFacture.filter(
  (ligneFacture) => ligneFacture.tva == 21
);

const sousTotalHorsTva0Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      ligneFacture.quantite *
      ligneFacture.prix *
      (1 - ligneFacture.reduction / 100)
  )
  .reduce(function (a, b) {
    return a + b;
  });

const sousTotalHorsTva6Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      ligneFacture.quantite *
      ligneFacture.prix *
      (1 - ligneFacture.reduction / 100)
  )
  .reduce(function (a, b) {
    return a + b;
  });
const sousTotalHorsTva12Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      ligneFacture.quantite *
      ligneFacture.prix *
      (1 - ligneFacture.reduction / 100)
  )
  .reduce(function (a, b) {
    return a + b;
  });
const sousTotalHorsTva21Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      ligneFacture.quantite *
      ligneFacture.prix *
      (1 - ligneFacture.reduction / 100)
  )
  .reduce(function (a, b) {
    return a + b;
  });

const sousTotalTva0Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      (ligneFacture.quantite *
        ligneFacture.prix *
        (100 - ligneFacture.reduction) *
        ligneFacture.tva) /
      10000
  )
  .reduce(function (a, b) {
    return a + b;
  });

const sousTotalTva6Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      (ligneFacture.quantite *
        ligneFacture.prix *
        (100 - ligneFacture.reduction) *
        ligneFacture.tva) /
      10000
  )
  .reduce(function (a, b) {
    return a + b;
  });
const sousTotalTva12Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      (ligneFacture.quantite *
        ligneFacture.prix *
        (100 - ligneFacture.reduction) *
        ligneFacture.tva) /
      10000
  )
  .reduce(function (a, b) {
    return a + b;
  });
const sousTotalTva21Prcent = facture.lignesFacture
  .filter((ligneFacture) => ligneFacture.tva == 0)
  .map(
    (ligneFacture) =>
      (ligneFacture.quantite *
        ligneFacture.prix *
        (100 - ligneFacture.reduction) *
        ligneFacture.tva) /
      10000
  )
  .reduce(function (a, b) {
    return a + b;
  });

/* const sousTotalHorsTva6Prcent = lignesFactureTva6Prcent.map(ligneFacture=>ligneFacture.quantite *
        ligneFacture.prix *
        (1 - ligneFacture.reduction / 100)).reduce(function(a, b) {
          return a + b; */

{
}
const ligneSousTotalTva0Prcent = function () {
  if (sousTotalHorsTva0Prcent) {
    return (
      <React.Fragment key="sousTotalHorsTva0Prcent">
        <div class="row">
          <div class="col">
            {'TVA ' + ' 0 % ' + 'de ' + sousTotalHorsTva0Prcent}
          </div>
          <div class="col">
            <div class="float-right">{sousTotalTva0Prcent}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
const ligneSousTotalTva6Prcent = function () {
  if (sousTotalHorsTva6Prcent) {
    return (
      <React.Fragment key="sousTotalHorsTva6Prcent">
        <div class="row">
          <div class="col">
            {'TVA ' + ' 0 % ' + 'de ' + sousTotalHorsTva6Prcent}
          </div>
          <div class="col">
            <div class="float-right">{sousTotalTva6Prcent}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
const ligneSousTotalTva12Prcent = function () {
  if (sousTotalHorsTva12Prcent) {
    return (
      <React.Fragment key="sousTotalHorsTva12Prcent">
        <div class="row">
          <div class="col">
            {'TVA ' + ' 0 % ' + 'de ' + sousTotalHorsTva12Prcent}
          </div>
          <div class="col">
            <div class="float-right">{sousTotalTva12Prcent}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
const ligneSousTotalTva21Prcent = function () {
  if (sousTotalHorsTva21Prcent) {
    return (
      <React.Fragment key="sousTotalHorsTva21Prcent">
        <div class="row">
          <div class="col">
            {'TVA ' + ' 0 % ' + 'de ' + sousTotalHorsTva21Prcent}
          </div>
          <div class="col">
            <div class="float-right">{sousTotalTva21Prcent}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
{
  /* {lignesFacture.map((ligneFacture, idx) => {
                if (ligneFacture.tva) {
                  return (
                    <React.Fragment key={idx}>
                      <div class="row">
                        <div class="col">
                          {'TVA ' +
                            ligneFacture.tva +
                            ' % ' +
                            'de ' +
                            ligneFacture.quantite *
                              ligneFacture.prix *
                              (1 - ligneFacture.reduction / 100)}
                        </div>
                        <div class="col">
                          <div class="float-right">
                            {(ligneFacture.quantite *
                              ligneFacture.prix *
                              (100 - ligneFacture.reduction) *
                              ligneFacture.tva) /
                              10000}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })} */
}

<div className="row ml-2">
  <div className="form-group">
    <label htmlFor="this" hidden={ligneFacture.labelcacher}>
      {''}
    </label>
  </div>

  <div className="form-group avatar" hidden>
    <label htmlFor="productImage" hidden>
      {''}
    </label>
  </div>

  <div className="form-group">
    <label htmlFor="produit" hidden={ligneFacture.labelcacher}>
      Produit
    </label>
  </div>
  <div className="form-group">
    <label htmlFor="description" hidden={ligneFacture.labelcacher}>
      Description
    </label>
  </div>

  <div className="form-group">
    <label htmlFor="quantite" hidden={ligneFacture.labelcacher}>
      Quantité
    </label>
  </div>

  <div className="form-group">
    <label htmlFor="unite" hidden={ligneFacture.labelcacher}>
      Unité
    </label>
  </div>
  <div className="form-group">
    <label htmlFor="prix" hidden={ligneFacture.labelcacher}>
      Prix
    </label>
  </div>
  <div className="form-group">
    <label htmlFor="reduction" hidden={ligneFacture.labelcacher}>
      Réduc.(%)
    </label>
  </div>
  <div className="form-group">
    <label htmlFor="tva" hidden={ligneFacture.labelcacher}>
      TVA (%)
    </label>
  </div>

  <div className="form-group">
    <label htmlFor="montant" hidden={ligneFacture.labelcacher}>
      Montant(HT)
    </label>
  </div>
  <div className="form-group">
    <label htmlFor="button" hidden={ligneFacture.labelcacher}>
      {''}
    </label>{' '}
  </div>
</div>;

<div className="form-group avatar" hidden>
  <label htmlFor="productImage" hidden>
    {''}
  </label>
  {/* <br /> present avant la première version */}
  <div>
    &nbsp;&nbsp;&nbsp;
    {/* prevoit possibilité d'ajout image pour produit */}
  </div>
</div>;

{
  /* <label htmlFor="button" hidden={ligneFacture.labelcacher}>
{''}
</label>{''}
<br /> present avant la première version */
}
`${moment(new Date()).format('YYYY-MM-D')}-${nbrFactureOfThisYear}`;

{
  lignesFacture.map((ligneFacture, idx) => {
    if (ligneFacture.tva) {
      return (
        <React.Fragment key={idx}>
          <div class="row">
            <div class="col">
              {'TVA ' +
                ligneFacture.tva +
                ' % ' +
                'de ' +
                ligneFacture.quantite *
                  ligneFacture.prix *
                  (1 - ligneFacture.reduction / 100)}
            </div>
            <div class="col">
              <div class="float-right">
                {(ligneFacture.quantite *
                  ligneFacture.prix *
                  (100 - ligneFacture.reduction) *
                  ligneFacture.tva) /
                  10000}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  });
}
