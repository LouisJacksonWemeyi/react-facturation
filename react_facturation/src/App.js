import React, { Component } from 'react';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //Redirect,
} from 'react-router-dom';
import FactureFinal from './components/factures/FactureFinal';
import FactureEdit from './components/factures/FactureEdit';
import FactureShow from './components/factures/FactureShow';
import FactureDelete from './components/factures/FactureDelete';
import FactureCreate from './components/factures/FactureCreate2.js';
import FacturesAcompte from './components/acomptes/FacturesAcompte.js';
import FactureFromDevis from './components/factures/FactureFromDevis.js';
import AcompteEdit from './components/acomptes/AcompteEdit.js';
import FactureAcompteCreate from './components/acomptes/FactureAcompteCreate.js';
import Profile from './components/profile/Profile';
import Client from './components/clients/Client';
import Devis from './components/devis/Devis.js';
import Produit from './components/produits/Produit';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from './components/auth/auth';
import './App.css';
import FactureDetails from './components/factures/FactureDetails2';
import DevisDetails from './components/devis/DevisDetails.js';
import DevisCreate from './components/devis/DevisCreate.js';
import DevisLieFacture from './components/devis/DevisLieFacture.js';
import ResetPassword from './components/auth/ResetPassword';
import DeviFinal from './components/devis/DevisFinal.js';
import AcompteFinal from './components/acomptes/AcompteFinal.js';
import ClientFactureAction from './components/users/ClientFactureAction.js';
import ClientFactureFinal from './components/users/ClientFactureFinal.js';

class App extends Component {
  render() {
    return (
      <Router forceRefresh={true}>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/facture/new"
                component={UserIsAuthenticated(FactureCreate)}
              />

              <Route
                exact
                path="/facture/edit"
                component={UserIsAuthenticated(FactureEdit)}
              />
              <Route
                exact
                path="/facture/:id"
                component={UserIsAuthenticated(FactureDetails)}
              />
              <Route
                exact
                path="/facture/show"
                component={UserIsAuthenticated(FactureShow)}
              />
              <Route
                exact
                path="/facture/delete"
                component={UserIsAuthenticated(FactureDelete)}
              />
              <Route
                exact
                path="/devis"
                component={UserIsAuthenticated(Devis)}
              />
              <Route
                exact
                path="/devis/new"
                component={UserIsAuthenticated(DevisCreate)}
              />
              <Route
                exact
                path="/devis/:id"
                component={UserIsAuthenticated(DevisDetails)}
              />
              <Route
                exact
                path="/compte/profile"
                component={UserIsAuthenticated(Profile)}
              />
              <Route
                exact
                path="/produits"
                component={UserIsAuthenticated(Produit)}
              />
              <Route
                exact
                path="/clients"
                component={UserIsAuthenticated(Client)}
              />
              <Route
                exact
                path="/facturesAcompte/facture/:id"
                component={UserIsAuthenticated(FacturesAcompte)}
              />
              <Route
                exact
                path="/facturesAcompte/facture/:id/new"
                component={UserIsAuthenticated(FactureAcompteCreate)}
              />
              <Route
                exact
                path="/acompte/:id"
                component={UserIsAuthenticated(AcompteEdit)}
              />
              <Route
                exact
                path="/facture/draft/fromDevis/:id"
                component={UserIsAuthenticated(FactureFromDevis)}
              />
              <Route
                exact
                path="/devisLieFacture/:id"
                component={UserIsAuthenticated(DevisLieFacture)}
              />
              <Route
                exact
                path="/factureFinal/:id"
                component={UserIsAuthenticated(FactureFinal)}
              />
              <Route
                exact
                path="/devisFinal/:id"
                component={UserIsAuthenticated(DeviFinal)}
              />
              <Route
                exact
                path="/acompteFinal/:id"
                component={UserIsAuthenticated(AcompteFinal)}
              />
              <Route
                exact
                path="/clientFactureAction/:id"
                component={UserIsAuthenticated(ClientFactureAction)}
              />
              <Route
                exact
                path="/clientFactureFinal/:id"
                component={UserIsAuthenticated(ClientFactureFinal)}
              />
              <Route
                exact
                path="/signin"
                component={UserIsNotAuthenticated(SignIn)}
              />
              <Route
                exact
                path="/signup"
                component={UserIsNotAuthenticated(SignUp)}
              />
              <Route
                exact
                path="/passwordReset"
                component={UserIsNotAuthenticated(ResetPassword)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
