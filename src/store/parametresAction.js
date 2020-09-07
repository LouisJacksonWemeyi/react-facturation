export const updateCompanyParam = param => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    //const firebase = getFirebase();
    const firestore = getFirestore();
    //const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    //var storageRef = firebase.storage().ref();
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        companyData: param
      })
      .then(() => {
        dispatch({
          type: 'CREATE_FACTURE',
          message: "Données de l'entreprise mis à jours avec succès"
        });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_FACTURE_ERROR', err });
      });
  };
};
