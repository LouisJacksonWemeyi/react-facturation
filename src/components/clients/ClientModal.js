import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {ajouterClientDataBase} from '../../store/actions/clientAction.js'
import { connect } from 'react-redux';


//import PropTypes from 'prop-types'

class ClientModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      client:{
        nom:'',
        adresse:'',
        pays:'',
        email:'',
        telephone:'',
        numTva:'',
        numClient:'',
        notes:''
      },
      showNouveauClient:false, 
      clientUpdate:false,
      openclientModal:false,
    };
  }

  handleSubmit = (event) => {
    if(this.state.clientUpdate){
    alert('indide update');
    //this.props.updateClientDataBase(this.state.client) 
    }else{  
    alert('indide ajouter');
    //this.props.ajouterClientDataBase(this.state.client)
    }
    event.preventDefault();
  };
  
  handleChange = (event)=>{
    let client = {...this.state.client};
    client[event.target.name]=event.target.value;    
    this.setState({client});
    if(event.target.name=='nom'){this.setState({showNouveauClient:false})}
  };

  closeModal = () => {
    /* const client={
      nom:'',
      adresse:'',
      pays:'',
      email:'',
      telephone:'',
      numTva:'',
      numClient:'',
      notes:''
    }
    this.setState({
      client
    }); */
    this.props.onHide();
  };
  componentDidUpdate(prevProps){
    console.log(this.state)
    if (this.props.client !== prevProps.client) {
      const {client}=this.props
      this.setState({client:client, clientUpdate:true,showNouveauClient:false},console.log(this.state))
      if(client.showNouveauClient){this.setState({showNouveauClient:true, clientUpdate:false})}
    }
  }
  /* static propTypes = {
    prop: PropTypes
  } */

  render() {
    const modalTitle = this.state.client.nom?(this.state.client.nom):('Editer le Client');
    if(this.props.client){
    return (
      <React.Fragment>
        <Modal
        show={this.props.show}
        onHide={this.closeModal}
        //{...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-client"
        centered
        //className="modal modal-send in"
        //dialogClassName="modal-90w"
      >
        <Modal.Header className="bg-light d-block" id="modaheader">
          <Modal.Title id="contained-modal-title-client">
            <div hidden={this.state.showNouveauClient}>{modalTitle}</div> 
            <div hidden={!this.state.showNouveauClient}>Nouveau Client</div> 
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          <div class="container-fluid">
            <div class="row" >
              <div class="col-lg-6">
                  <div class="form-group">
                    <label class="control-label" for="nom">
                      Nom
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="far fa-user" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientNom" 
                      name="nom" 
                      type="text"
                      value={this.state.client.nom}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="adresse">
                      Adresse
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-map-marker-alt" style={{color:"blue"}}></i></span>
                      </div>
                      <textarea 
                      class="form-control" 
                      id="clientAdresse" 
                      name="adresse" 
                      type="text"
                      value={this.state.client.adresse}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
              </div>
              <div class="col-lg-6">
                  <div class="form-group">
                    <label class="control-label" for="telephone">
                      Téléphone
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-phone" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientTelephone" 
                      name="telephone" 
                      type="text"
                      value={this.state.client.telephone}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div> 
                  <div class="form-group">
                    <label class="control-label" for="numTva">
                      N° TVA UE
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-landmark" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientTva" 
                      name="numTva" 
                      type="text"
                      value={this.state.client.numTva}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                  <div class="form-group">
                    <label class="control-label" for="pays">
                      Pays
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-flag" style={{color:"blue"}}></i></span>
                      </div>
                      <input
                       class="form-control" 
                       id="clientPays" 
                       name="pays" 
                       type="text"
                       value={this.state.client.pays}
                       onChange={this.handleChange}
                       />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="email">
                      E-mail
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-at" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientEmail" 
                      name="email" 
                      type="text"
                      value={this.state.client.email}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
              </div>
              <div class="col-lg-6">

                  <div class="form-group">
                    <label class="control-label" for="numClient">
                      Numéro de Client
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-bars" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientNumber" 
                      name="numClient" 
                      type="text"
                      value={this.state.client.numClient}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="control-label" for="notes">
                      Notes
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                       <span class="input-group-text"><i class="fas fa-comment-alt" style={{color:"blue"}}></i></span>
                      </div>
                      <input 
                      class="form-control" 
                      id="clientNotes" 
                      name="notes" 
                      type="text"
                      value={this.state.client.notes}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button onClick={this.props.onHide} variant="btn btn-outline-primary">Annuler</Button>
            <Button
            //onClick={() => this.sendFacture(uploadedFiles, authclientNom)}
            type="submit" value="submit" class="last-focus-target btn btn-primary draft-send-btn">
            Enregistrer
            </Button>          
          </Modal.Footer>
        </form>
      </Modal>
      </React.Fragment>
    )
   }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ajouterClientDataBase: client => dispatch(ajouterClientDataBase(client)),
     };
};
export default connect(
  null,
  mapDispatchToProps
)(ClientModal)