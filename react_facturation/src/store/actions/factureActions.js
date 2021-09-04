export const createFacture = (facture) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('factures')
      .add({
        ...facture,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_FACTURE', facture: facture });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const createFacture20 = (facture) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('factures2')
      .add({
        ...facture,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_FACTURE', facture: facture });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const createFacture2 = (facture, files) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    //var storageRef = firebase.storage().ref();
    firestore
      .collection('factures2')
      .add({
        ...facture,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then((resp) => {
        //var storageRef = firebase.storage().ref(resp.id);
        return firebase.uploadFiles(resp.id, files, resp.id);
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: 'Nouvelle facture ajoutée avec sucès',
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateFactureDataBase = (facture) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('factures2').doc(`${facture.id}`);
    ref
      .set({
        ...facture,
      })
      .then((res) => {
        console.log(res);
        ref.update({ id: firebase.firestore.FieldValue.delete() });
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `facture n°${facture.numFacture} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateFactureStatut = (facture, factureStatut) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('factures2').doc(`${facture.id}`);
    ref
      .update({ factureStatut: factureStatut })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `statut de la facture n°${facture.numFacture} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const supprimerFacture = (facture) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('factures2').doc(`${facture.id}`);
    ref
      .delete()
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `facture n°${facture.numFacture} supprimée avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};

/* return firebase.uploadFiles(
  resp.facture.id,
  files,
  'facturesFlies' + resp.facture.id
); */
