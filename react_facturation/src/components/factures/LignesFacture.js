import React, { Component } from 'react';

const LignesFacture = (props) => {
  if (props.produits) {
    return props.lignesFacture.map((ligneFacture, idx) => {
      return (
        <React.Fragment key={idx}>
          <div className="d-inline-flex ml-2" style={{ marginTop: '' }}>
            <div class="form-group">
              <label htmlFor="this" hidden={ligneFacture.labelcacher}>
                {''}
              </label>
              <div>
                <i className="fas fa-align-justify mr-1">{'  '}</i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="produit" hidden={ligneFacture.labelcacher}>
                Produit
              </label>
              {/* <br /> present avant la première version */}
              <div className="input-group form-group">
                <input
                  type="text"
                  size="35"
                  className="form-control border-right-0 border produit"
                  name="produit"
                  placeholder="Nom"
                  //name={`produit-${idx}`}
                  //name="produit"
                  id={`produit-${idx}`}
                  data-id={idx}
                  value={ligneFacture.produit}
                  onBlur={() =>
                    props.handleOnfocusOutInputProduitLigneFacture(
                      ligneFacture,
                      idx
                    )
                  }
                  onChange={props.handleChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline dropdown-toggle border border-left-0"
                    data-toggle="dropdown"
                  />
                  <div className="dropdown-menu">
                    {props.produits.map((produit, index) => {
                      return (
                        <a
                          className="dropdown-item"
                          //href="#"
                          key={`${produit.nom}-${index}`}
                          onClick={props.handleSelectProduitLigneFacture.bind(
                            this,
                            ligneFacture,
                            idx,
                            produit
                          )}
                        >
                          {produit.nom}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quantite" hidden={ligneFacture.labelcacher}>
                Quantité
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="quantite"
                id={`quantite-${idx}`}
                data-id={idx}
                value={ligneFacture.quantite}
                onChange={props.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unite" hidden={ligneFacture.labelcacher}>
                Unité
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="unite"
                id={`unite-${idx}`}
                data-id={idx}
                value={ligneFacture.unite}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prix" hidden={ligneFacture.labelcacher}>
                Prix
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="prix"
                id={`prixTTC-${idx}`}
                data-id={idx}
                value={ligneFacture.prix}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reduction" hidden={ligneFacture.labelcacher}>
                Réduc.(%)
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="reduction"
                id={`reduction-${idx}`}
                data-id={idx}
                value={ligneFacture.reduction}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tva" hidden={ligneFacture.labelcacher}>
                TVA
              </label>
              <select
                className="form-control"
                name="tva"
                id={`tva-${idx}`}
                data-id={idx}
                value={ligneFacture.tva}
                onChange={props.handleChange}
              >
                <option value="0">0 %</option>
                <option value="6">6 %</option>
                <option value="12">12 %</option>
                <option value="21">21 %</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="montant" hidden={ligneFacture.labelcacher}>
                Montant(HT)
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="montant"
                id={`montantTTC-${idx}`}
                data-id={idx}
                value={
                  (ligneFacture.quantite *
                    ligneFacture.prix *
                    (100 - ligneFacture.reduction)) /
                  100
                }
                readOnly={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="button" hidden={ligneFacture.labelcacher}>
                {''}
              </label>{' '}
              <button
                type="button"
                className="btn btn-ouline border dropdown-toggle form-control"
                data-toggle="dropdown"
              />
              <div className="dropdown-menu">
                <a
                  className="dropdown-item" //href="#"
                  onClick={() => props.onLigneFactureDelete(ligneFacture, idx)}
                  hidden={props.lignesFacture.length == 1}
                >
                  Supprimer la ligne
                </a>
                {/* <a
                  className="dropdown-item"
                  //href="#"
                >
                  Annuler réduction
                </a>
                <a
                  className="dropdown-item"
                  //href="#"
                >
                  description{' '}
                </a>
                <a
                  className="dropdown-item"
                  //href="#"
                  hidden="true"
                >
                  Supprimer la ligne
                </a> */}
              </div>
            </div>
          </div>
          <div
            className="form-group"
            style={{
              maxWidth: '50%',
              marginLeft: '25px',
              marginTop: '-25px',
              marginBottom: '30px',
            }}
          >
            <label
              className="hidden"
              htmlFor="description"
              hidden={ligneFacture.labelcacher}
            >
              Description
            </label>
            <textarea
              type="text"
              rows="30"
              maxLength="1500"
              style={{
                height: '37px',
              }}
              className="form-control"
              name="description"
              id={`description-${idx}`}
              data-id={idx}
              value={ligneFacture.description}
              onChange={props.handleChange}
              placeholder="Description"
              required
            ></textarea>
            <a
              className="editerProduit text-primary"
              onClick={() =>
                props.handleOpenEditerProduitModalFacture(true, idx)
              }
              hidden={ligneFacture.actionProduit == null}
              //href="#"
            >
              {ligneFacture.actionProduit}
            </a>
          </div>
        </React.Fragment>
      );
    });
  } else {
    return null;
  }
};

export default LignesFacture;
