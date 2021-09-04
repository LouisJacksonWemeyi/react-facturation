import authReducer from './authReducer';
import factureReducer from './factureReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
const rootReducer = combineReducers({
  auth: authReducer,
  facture: factureReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
