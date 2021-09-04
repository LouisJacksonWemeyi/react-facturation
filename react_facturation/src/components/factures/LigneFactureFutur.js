import React, { Component } from 'react';

const LigneFacture = props => {
  /*   state = {
    hiddenLabel: true,
    ligneFacture: [
      {
        produit: '',
        quantite: '',
        unité: '',
        prix: '',
        reduction: '',
        tva: '',
        montant: '',
        descrition: '',
        labelcacher: false
      }
    ]
  }; */
  return props.lignesFacture.map((ligneFacture, idx) => {
    /* if (idx == 0) {
      props.setLabelLignesFacture(idx);
    } */
    return (
      <React.Fragment key={idx}>
        {/* <h1>LigneFacture</h1> */}
        <div class="row">
          <div class="form-group">
            <label htmlFor="this" hidden={ligneFacture.labelcacher}>
              {''}
            </label>
            <br />
            <div>
              <i className="fas fa-align-justify">{'  '}</i>
            </div>
          </div>

          <div class="form-group avatar">
            <label htmlFor="productImage" hidden={ligneFacture.labelcacher}>
              {''}
            </label>
            <br />
            <div style={{ marginLeft: 3, marginRight: 3 }}>
              &nbsp;&nbsp;&nbsp;
              {/* prevoit possibilité d'ajout image pour produit */}
            </div>
          </div>

          <div className="form-group">
            <label htmlfor={`produit-${idx}`} hidden={ligneFacture.labelcacher}>
              Produit
            </label>
            <br />
            <div className="input-group form-group">
              <input
                type="text"
                size="40"
                className="form-control border-right-0 border"
                name={`produit-${idx}`}
                id={`produit-${idx}`}
                data-id={idx}
                value={ligneFacture.produit}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline dropdown-toggle border-left-0 border"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Link 1
                  </a>
                  <a className="dropdown-item" href="#">
                    Link 2
                  </a>
                  <a className="dropdown-item" href="#">
                    Link 3
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label
              htmlFor={`quantite-${idx}`}
              hidden={ligneFacture.labelcacher}
            >
              Quantité
            </label>{' '}
            <br />
            <input
              type="text"
              size="7"
              className="form-control"
              name={`quantite-${idx}`}
              id={`quantite-${idx}`}
              data-id={idx}
              value={ligneFacture.quantite}
            />
          </div>

          <div class="form-group">
            <label htmlFor={`unite-${idx}`} hidden={ligneFacture.labelcacher}>
              Unité
            </label>
            <br />
            <input
              type="text"
              size="7"
              className="form-control"
              name={`unite-${idx}`}
              id={`unite-${idx}`}
              data-id={idx}
              value={ligneFacture.unite}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`prixTTC-${idx}`} hidden={ligneFacture.labelcacher}>
              Prix(TTC)
            </label>
            <br />
            <input
              type="text"
              size="7"
              className="form-control"
              name={`prixTTC-${idx}`}
              id={`prixTTC-${idx}`}
              data-id={idx}
              value={ligneFacture.prix}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor={`reduction-${idx}`}
              hidden={ligneFacture.labelcacher}
            >
              Réduc.
            </label>
            <br />
            <input
              type="text"
              size="7"
              className="form-control"
              name={`reduction-${idx}`}
              id={`reduction-${idx}`}
              data-id={idx}
              value={ligneFacture.reduction}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tva" hidden={ligneFacture.labelcacher}>
              TVA
            </label>
            <br />
            <select
              className="selectpicker form-control"
              data-live-search="true"
              data-style="btn btn-outline border"
              /* name={`tva-${idx}`}
              id={`tva-${idx}`}
              data-id={idx}
              value={ligneFacture.tva} */
            >
              <option value="0" data-tokens="21 %">
                21 %
              </option>
              <option value="1">12 %</option>
              <option value="2">6 %</option>
              <option value="3">0 %</option>
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="montantTTC" hidden={ligneFacture.labelcacher}>
              Montant(TTC)
            </label>
            <br />
            <input
              type="text"
              size="7"
              className="form-control"
              name={`montantTTC-${idx}`}
              id={`montantTTC-${idx}`}
              data-id={idx}
              value={ligneFacture.prix * ligneFacture.tva}
              readonly="true"
            />
          </div>
          <div class="form-group">
            <label for="button" hidden={ligneFacture.labelcacher}>
              {''}
            </label>{' '}
            <br />
            <button
              type="button"
              class="btn btn-ouline border dropdown-toggle"
              data-toggle="dropdown"
            />
            <div class="dropdown-menu">
              <a className="dropdown-item" href="#">
                Réduction
              </a>
              <a className="dropdown-item" href="#">
                Annuler réduction
              </a>
              <a className="dropdown-item" href="#">
                description{' '}
              </a>
              <a className="dropdown-item" href="#" hidden="true">
                Supprimer la ligne
              </a>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              {/* <label htmlFor="this" hidden={this.state.hiddenLabel}>
              {''}
            </label> */}
              <br />

              <input
                type="text"
                size="38"
                className="form-control"
                name={`description-${idx}`}
                id={`description-${idx}`}
                data-id={idx}
                value={ligneFacture.description}
                style={{ marginLeft: 33, marginTop: -40 }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
};

export default LigneFacture;
