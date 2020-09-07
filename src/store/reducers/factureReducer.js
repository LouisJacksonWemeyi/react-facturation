const initState = { factureMessage: null, messageType: null };

const factureReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_FACTURE':
      console.log('created facture', action.facture);
      return {
        ...state,
        factureMessage: action.message,
        messageType: 'success',
      };
    case 'CREATE_FACTURE_ERROR':
      console.log('create facture error', action.err);
      return {
        ...state,
        factureMessage: action.err.message,
        messageType: 'error',
      };
    case 'CLEAR_STATE':
      console.log('clear state', action.message);
      return {
        ...state,
        factureMessage: null,
        messageType: null,
      };
    default:
      return state;
  }
};

export default factureReducer;
