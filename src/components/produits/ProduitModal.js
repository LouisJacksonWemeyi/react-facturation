import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ProduitModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      produit:{
        nom:'',
        description:'',
        netUnitSalesPrice:'',
        rate:'',
        sku:'',
        unite:''
      },
      refFacture: null
    };
  }

  handleChange = (event)=>{
    let produit = {...this.state.produit};
    produit[event.target.name]=event.target.value;    
    this.setState({produit});
  };

  handleSubmit = (e) => {
    alert('Your favorite flavor is: ' + e);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        //{...props}
        size="lg"
        aria-labelledby="contained-modal-title-produit"
        centered
        //className="modal modal-send in"
        //dialogClassName="modal-90w"
      >
        <Modal.Header className="bg-light d-block" id="modaheader">
          <Modal.Title id="contained-modal-title-produit">
            Nouveau Produit
            {/* <div style={{ display: 'centered' }}>{alert}</div> */}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          <div class="container-fluid">
            <div class="row" >
              <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nom">Nom</label>
                    <input
                    type="text"
                    name="nom"
                    //id="customer-nom"
                    class="form-control"
                    //data-bind="recipient"
                    maxLength="300"
                    //placeholder="Séparer les adresses e-mail par une virgule"
                    value={this.state.produit.nom}
                    onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                    type="text"
                    name="description"
                    //id="customer-nom"
                    class="form-control"
                    //data-bind="recipient"
                    maxLength="1500"
                    //placeholder="Séparer les adresses e-mail par une virgule"
                    value={this.state.produit.description}
                    onChange={this.handleChange}
                    ></textarea>
                  </div>
              </div>
              <div class="col-lg-6">
                  <div class="form-group">              
                        <label for="netUnitSalesPrice"> Prix HT </label>
                        <input
                        type="text"
                        name="netUnitSalesPrice"
                        //id="netUnitSalesPrice"
                        class="form-control"
                        //data-bind="netUnitSalesPrice"
                        maxLength="30"
                        //placeholder="Séparer les adresses e-mail par une virgule"
                        value={this.state.produit.netUnitSalesPrice}
                        onChange={this.handleChange}
                        />
                  </div>
                  <div class="form-group">
                        <label class="mandatory-label" for="rate">TVA</label>              
                        <select 
                        value={this.state.produit.rate} 
                        onChange={this.handleChange}
                        class="form-control"
                        name="rate"
                        >
                        <option value="21">21 %</option>
                        <option value="12">12 %</option>
                        <option value="6">6 %</option>
                        <option value="0">0 %</option>
                        </select>
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
              <div class="form-group">
                    <label for="sku">N° de Produit</label>
                    <input
                    type="text"
                    name="sku"
                    //id="customer-nom"
                    class="form-control"
                    //data-bind="recipient"
                    maxLength="30"
                    //placeholder="Séparer les adresses e-mail par une virgule"
                    value={this.state.produit.sku}
                    onChange={this.handleChange}
                    />
                  </div>
              </div>
              <div class="col-lg-6">
              <div class="form-group">              
                        <label for="unite">Unité</label>
                        <input
                        type="text"
                        name="unite"
                        //id="unite"
                        class="form-control"
                        //data-bind="netUnitSalesPrice"
                        maxLength="30"
                        //placeholder="Séparer les adresses e-mail par une virgule"
                        value={this.state.produit.unite}
                        onChange={this.handleChange}
                        />
                  </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button onClick={this.props.onHide} variant="btn btn-outline-primary">Annuler</Button>
          <Button
          //onClick={() => this.sendFacture(uploadedFiles, authEmail)}
           type="submit" class="last-focus-target btn btn-primary draft-send-btn">
          Enregistrer
          </Button>          
        </Modal.Footer>
        </form>
      </Modal>
      </div>
    )
  }
}

ProduitModal.propTypes = {

}

export default ProduitModal


