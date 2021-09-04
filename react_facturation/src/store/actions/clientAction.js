export const ajouterClientDataBase = (client) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('clients')
      .add({
        ...client,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: 'Nouveau client ajouté avec succès',
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateClientDataBase = (client) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('clients').doc(`${client.id}`);
    ref
      .set({
        ...client,
      })
      .then((res) => {
        console.log(res);
        ref.update({ id: firebase.firestore.FieldValue.delete() });
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `client n°${client.numClient} ${client.nom} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};

export const deleteClientDataBase = (client) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    firestore
      .collection('clients')
      .doc(`${client.id}`)
      .delete()
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `client n°${client.numClient} ${client.nom} supprimé avec succès`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
