import React, { Component } from 'react';

const LignesDevis = (props) => {
  if (props.produits) {
    return props.lignesDevis.map((ligneDevis, idx) => {
      return (
        <React.Fragment key={idx}>
          <div className="d-inline-flex ml-2" style={{ marginTop: '' }}>
            <div class="form-group">
              <label htmlFor="this" hidden={ligneDevis.labelcacher}>
                {''}
              </label>
              <div>
                <i className="fas fa-align-justify mr-1">{'  '}</i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="produit" hidden={ligneDevis.labelcacher}>
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
                  value={ligneDevis.produit}
                  onBlur={() =>
                    props.handleOnfocusOutInputProduitLigneDevis(
                      ligneDevis,
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
                          onClick={props.handleSelectProduitLigneDevis.bind(
                            this,
                            ligneDevis,
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
              <label htmlFor="quantite" hidden={ligneDevis.labelcacher}>
                Quantité
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="quantite"
                id={`quantite-${idx}`}
                data-id={idx}
                value={ligneDevis.quantite}
                onChange={props.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unite" hidden={ligneDevis.labelcacher}>
                Unité
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="unite"
                id={`unite-${idx}`}
                data-id={idx}
                value={ligneDevis.unite}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prix" hidden={ligneDevis.labelcacher}>
                Prix
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="prix"
                id={`prixTTC-${idx}`}
                data-id={idx}
                value={ligneDevis.prix}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reduction" hidden={ligneDevis.labelcacher}>
                Réduc.(%)
              </label>
              <input
                type="text"
                size="7"
                className="form-control"
                name="reduction"
                id={`reduction-${idx}`}
                data-id={idx}
                value={ligneDevis.reduction}
                onChange={props.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tva" hidden={ligneDevis.labelcacher}>
                TVA
              </label>
              <select
                className="form-control"
                name="tva"
                id={`tva-${idx}`}
                data-id={idx}
                value={ligneDevis.tva}
                onChange={props.handleChange}
              >
                <option value="0">0 %</option>
                <option value="6">6 %</option>
                <option value="12">12 %</option>
                <option value="21">21 %</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="montant" hidden={ligneDevis.labelcacher}>
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
                  (ligneDevis.quantite *
                    ligneDevis.prix *
                    (100 - ligneDevis.reduction)) /
                  100
                }
                readOnly={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="button" hidden={ligneDevis.labelcacher}>
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
                  onClick={() => props.onLigneDevisDelete(ligneDevis, idx)}
                  hidden={props.lignesDevis.length == 1}
                >
                  Supprimer la ligne
                </a>
                {/* <a
                  className="dropdown-item"
                  onClick={() => props.handleOpenEditProduitModal(true, idx)}
                  hidden={ligneDevis.actionProduit == null}
                  //href="#"
                >
                  {ligneDevis.actionProduit}
                </a> 
                <a
                  className="dropdown-item"
                  //href="#"
                >
                  description
                </a> 
                <a
                  className="dropdown-item"
                  //href="#"
                  hidden={true}
                >
                  Supprimer la ligne
                </a>*/}
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
              hidden={ligneDevis.labelcacher}
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
              value={ligneDevis.description}
              onChange={props.handleChange}
              placeholder="Description"
              required
            ></textarea>
            <a
              className="editerProduit text-primary"
              onClick={() => props.handleOpenEditerProduitModalDevis(true, idx)}
              hidden={ligneDevis.actionProduit == null}
              //href="#"
            >
              {ligneDevis.actionProduit}
            </a>
          </div>
        </React.Fragment>
      );
    });
  } else {
    return null;
  }
};

export default LignesDevis;
