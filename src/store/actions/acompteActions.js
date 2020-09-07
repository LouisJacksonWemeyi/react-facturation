export const createAcompte = (acompte) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('acomptes')
      .add({
        ...acompte,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: "Nouvelle facture d'acompte ajoutée avec succès",
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateAcompte = (acompte) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('acomptes').doc(`${acompte.id}`);
    ref
      .set({
        ...acompte,
      })
      .then((res) => {
        console.log(res);
        ref.update({ id: firebase.firestore.FieldValue.delete() });
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: ` acompte n° ${acompte.numAcompte} mis à jour avec succès`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateAcompteStatut = (acompte, acompteStatut) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('acomptes').doc(`${acompte.id}`);
    ref
      .update({ acompteStatut: acompteStatut })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `statut de l'acompte n°${acompte.numAcompte} mis a jour avec succès`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const supprimerAcompte = (acompte) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('acomptes').doc(`${acompte.id}`);
    ref
      .delete()
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `acompte n°${acompte.numAcompte} supprimé avec succès`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
