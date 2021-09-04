export const createDevis = (devis, files) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firebase = getFirebase();
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    //var storageRef = firebase.storage().ref();
    firestore
      .collection('devis')
      .add({
        ...devis,
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
          message: 'Nouveau devis ajoutée avec succès',
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateDevisDataBase = (devis) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('devis').doc(`${devis.id}`);
    ref
      .set({
        ...devis,
      })
      .then((res) => {
        console.log(res);
        ref.update({ id: firebase.firestore.FieldValue.delete() });
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `devis n°${devis.numDevis} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateDevisStatut = (devis, devisStatut) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('devis').doc(`${devis.id}`);
    ref
      .update({ devisStatut: devisStatut })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `statut du devis n°${devis.numDevis} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const supprimerDevis = (devis) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('devis').doc(`${devis.id}`);
    ref
      .delete()
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `devis n°${devis.numDevis} supprimée avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
