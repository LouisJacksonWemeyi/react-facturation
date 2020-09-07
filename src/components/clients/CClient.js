import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ClientModal from './ClientModal.js';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ClientsListDataTable from './ClientsListDataTable.js'
import {updateClientDataBase} from '../../store/actions/clientAction.js'
import {deleteClientDataBase} from '../../store/actions/clientAction.js'
import DeleteClientModal from './DeleteClientModal.js'

import Spinner from '../layout/Spinner';

 
class Client extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      updateClient:{},
      showNouveauuClient:true,
      clientUpdate:false,
      openClientModal:false,
      deleteClient:{}
    };
  }
  
  handleOnClickNouveauClient = data => {
    /* const client={
      nom:'',
      adresse:'',
      pays:'',
      email:'',
      telephone:'',
      numTva:'',
      numClient:'',
      notes:'',
      showNouveauClient:true, 
    }; */

    this.setState({
      open: data
    });
  };

  handleCloseModal =()=>{
    const client={
      nom:'',
      adresse:'',
      pays:'',
      email:'',
      telephone:'',
      numTva:'',
      numClient:'',
      notes:'',
    };
    this.setState({updateClient:client,open:false});
  }

  updateClient=(client)=>{
    console.log(client)
    this.setState({updateClient:client, open:true})
    console.log(this.state.updateClient)
  }

  handleDeleteClientModal=(data,client)=>{this.setState({openClientModal:data, deleteClient:client})}

  handleDeleteClientDataBase = () => {this.props.deleteClientDataBase(this.state.deleteClient)}
  handleUpdateClientDataBase = (client) => {this.props.updateClientDataBase(client)}


  render() {
    const { clients } = this.props;
    if(clients){
      return (
        <React.Fragment>
          <h2>Clients</h2>
          <h2>
            <ButtonToolbar>

            <Button variant="primary" onClick={() => this.handleOnClickNouveauClient(true)}>
              Nouveau Client
            </Button>

            <ClientModal
              show={this.state.open}
              onHide={this.handleCloseModal}
              client={this.state.updateClient}
              //showNouveauuClient={this.state.showNouveauuClient}
              updateClientDataBase={this.handleUpdateClientDataBase}
            />

            <DeleteClientModal
            show={this.state.openClientModal}
            onHide={() => this.handleDeleteClientModal(false)}
            deleteClientDataBase={this.handleDeleteClientDataBase}
            /> 

            </ButtonToolbar>
          </h2>
          <ClientsListDataTable
            clients={clients}
            updateClient={this.updateClient}
            handleDeleteClientModal={this.handleDeleteClientModal}
          />
        </React.Fragment>
      );
  }else{ 
    return <Spinner />;
  }
 }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    clients: state.firestore.ordered.clients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateClientDataBase: client => dispatch(updateClientDataBase(client)),
    deleteClientDataBase: client => dispatch(deleteClientDataBase(client))
  };
};
export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect(props => {
  return [
    { collection: 'clients', where: [['authorId', '==', props.auth.uid]] }
  ];
}))(Client);
