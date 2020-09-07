export const ajouterProduitDataBase = (produit) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('produits')
      .add({
        ...produit,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: 'Nouveau produit ajouté avec succès',
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
export const updateProduitDataBase = (produit) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    const ref = firestore.collection('produits').doc(`${produit.id}`);
    ref
      .set({
        ...produit,
      })
      .then(() => {
        ref.update({ id: firebase.firestore.FieldValue.delete() });
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `produit n°${produit.sku} ${produit.nom} mis a jour avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};

export const deleteProduitDataBase = (produit) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //const firebase = getFirebase();
    const firestore = getFirestore();
    //const authorId = getState().firebase.auth.uid;
    firestore
      .collection('produits')
      .doc(`${produit.id}`)
      .delete()
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: `produit n°${produit.sku} ${produit.nom} supprimé avec succes`,
        });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
