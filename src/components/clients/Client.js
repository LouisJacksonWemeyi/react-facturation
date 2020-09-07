import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
//import ClientModal from './ClientModal.js'
import ModalClient from './ModalClient.js';
import { ajouterClientDataBase } from '../../store/actions/clientAction.js';
import { updateClientDataBase } from '../../store/actions/clientAction.js';
import { deleteClientDataBase } from '../../store/actions/clientAction.js';
import ClientsListDataTable from './ClientsListDataTable.js';
import Spinner from '../layout/Spinner';
import DeleteClientModal from './DeleteClientModal.js';
import moment from 'moment';
import Alert from '../layout/Alert.js';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      client: {
        nom: '',
        adresse: '',
        pays: '',
        email: '',
        telephone: '',
        numTva: '',
        numClient: '',
        notes: '',
      },
      showNouveauClient: true,
      clientUpdate: false,
      openClientModal: false,
      deleteClient: {},
    };
  }

  handleChange = (event) => {
    let client = { ...this.state.client };
    client[event.target.name] = event.target.value;
    this.setState({ client });
    if (event.target.name == 'nom') {
      this.setState({ showNouveauClient: false });
    }
  };

  handleSubmit = (e) => {
    if (!this.state.clientUpdate) {
      //alert('indide ajouter');
      this.props.ajouterClientDataBase(this.state.client);
    } else {
      //alert('indide update');
      this.props.updateClientDataBase(this.state.client);
    }
    e.preventDefault();
  };

  handleModal = (data) => {
    const client = { ...this.state.client };
    client.nom = '';
    client.adresse = '';
    client.pays = 'Belgique';
    client.email = 'clientEmail@client.domain';
    client.telephone = '+32(0)222444555';
    client.numTva = 'BE 0999999999';
    //client.notes= '';
    this.setState({
      client,
      showNouveauClient: true,
      open: data,
      clientUpdate: false,
    });
  };

  updateClient = (client) => {
    this.setState({
      client,
      open: true,
      showNouveauClient: false,
      clientUpdate: true,
    });
  };

  handleDeleteClientModal = (data, client) => {
    this.setState({ openClientModal: data, deleteClient: client });
  };

  handleDeleteClientDataBase = () => {
    this.props.deleteClientDataBase(this.state.deleteClient);
  };
  componentWillReceiveProps(nextProps) {
    // Typical usage (don't forget to compare props):
    const numClient = nextProps.clients ? nextProps.clients.length + 1 : 1;
    const client = { ...this.state.client };
    client.numClient = `${numClient}-${moment(new Date()).format(
      'DD-MM-YYYY'
    )}`;
    this.setState({ client });
  }

  render() {
    const { clients, clientMessage, messageType } = this.props;
    if (clients) {
      return (
        <React.Fragment>
          {clientMessage ? (
            <Alert message={clientMessage} messageType={messageType} />
          ) : null}
          <h2>Clients</h2>
          <h2>
            <ButtonToolbar>
              <Button variant="primary" onClick={() => this.handleModal(true)}>
                Nouveau Client
              </Button>
              <ModalClient
                show={this.state.open}
                onHide={() => this.handleModal(false)}
                handleSubmit={this.handleSubmit}
                client={this.state.client}
                handleChange={this.handleChange}
                showNouveauClient={this.state.showNouveauClient}
              />

              <DeleteClientModal
                show={this.state.openClientModal}
                onHide={() => this.handleDeleteClientModal(false)}
                deleteClientDataBase={this.handleDeleteClientDataBase}
                deleteClient={this.state.deleteClient}
              />
              {/* <ClientModal
           show={this.state.open}
           onHide={() => this.handleModal(false)}
           handleSubmit={this.handleSubmit}
           //Client={this.state.Client}
           //handleChange={this.handleChange}
          /> */}
            </ButtonToolbar>
          </h2>
          <ClientsListDataTable
            clients={clients}
            updateClient={this.updateClient}
            handleDeleteClientModal={this.handleDeleteClientModal}
          />
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    clients: state.firestore.ordered.clients,
    clientMessage: state.facture.factureMessage,
    messageType: state.facture.messageType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ajouterClientDataBase: (client) => dispatch(ajouterClientDataBase(client)),
    updateClientDataBase: (client) => dispatch(updateClientDataBase(client)),
    deleteClientDataBase: (client) => dispatch(deleteClientDataBase(client)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      { collection: 'clients', where: [['authorId', '==', props.auth.uid]] },
    ];
  })
)(Client);
