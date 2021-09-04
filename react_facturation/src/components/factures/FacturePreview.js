import React from 'react';
import '../../css/facturesCss/facturePreview.css';

const FacturePreview = ({ facture }) => {
  return (
    <React.Fragment>
      <div className="" id="page">
        <div className="row">
          <div className="col-8">
            <h2 className="header-block__company-name">Your company name</h2>
          </div>
          <div className="col-4 float-right">
            <img
              className="header-block__logo"
              src={require('./logo.png')}
              alt="Your compagny logo"
            />
          </div>
        </div>
        <div className="page-break page-break-visited">
          <br />
          <br />
        </div>
        <div className="row">
          <div className="col-8">
            <div>{facture.client.nomClient}</div>
            <div>{facture.client.adressClient}</div>
            <div>{facture.client.emailClient}</div>
            <div>{facture.client.telephonClient}</div>
          </div>
          <div className="col-4 ">
            <div className="invoice-info">
              <h4 className="header-text">
                <i>Facture #{facture.numFacture}</i>
              </h4>
              <div className="invoice-info__lines">
                <div>
                  <hr
                    style={{
                      display: 'block',
                      height: '1px',
                      border: '0',
                      borderTop: '1px solid #ccc',
                      margin: '1em 0',
                      padding: '0'
                    }}
                  />
                </div>
                <div class="row">
                  <div class="col">
                    <label>
                      <span>Date de facture</span>
                    </label>
                  </div>
                  <div class="col text-right">
                    <span class="value">
                      {facture.dateFacture.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>
                      <span>Date d'échéance</span>
                    </label>
                  </div>
                  <div class="col text-right">
                    <span class="value">
                      {facture.dateEcheanceFacture.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>
                      <span>Numéro client</span>
                    </label>
                  </div>
                  <div class="col text-right">
                    <span class="value">{facture.numFacture}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-break page-break-visited">
          <br />
          <br />
        </div>

        <div
          className=" notes base-text"
          style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}
        >
          {facture.notesFacture}
        </div>

        <div className="page-break page-break-visited">
          <br />
          <br />
        </div>

        <div class="invoice-table">
          <table className="table" id="invoice-lines-table">
            <thead>
              <tr>
                {/* <td class="table-text td-product-img"></td> */}
                {/* <td class="header-text td-product-number">
                  <i>Produit</i>
                </td> */}
                <th
                  class="header-text td-description table-text"
                  style={{ paddingLeft: '0' }}
                >
                  <i>Description</i>
                </th>
                <th class="td-quantity header-text table-number">
                  <i>Quantité</i>
                </th>
                <th class="td-unit header-text table-text">
                  <i>Unité</i>
                </th>
                <th class="td-price header-text table-number">
                  <i>Prix</i>
                </th>
                <th class="td-line-discount header-text table-number">
                  <i>Réduction(%)</i>
                </th>
                <th class="td-vat header-text table-number must-show">
                  <i>TVA(%)</i>
                </th>
                <th class="td-line-total header-text table-number">
                  <i>Montant(HT)</i>
                </th>
              </tr>
            </thead>
            <tbody id="invoice-lines">
              {facture.lignesFacture.map(ligneFacture => {
                return (
                  <React.Fragment>
                    <tr class="invoice-table__line base-text text-right">
                      {/* <td></td> */}
                      {/* <td>{ligneFacture.produit}</td> */}
                      <td
                        class="header-text td-description table-text"
                        style={{ paddingLeft: '0' }}
                      >
                        {ligneFacture.produit}
                        <div class="invoice-table__description">
                          {ligneFacture.description}
                        </div>
                      </td>
                      <td class="td-quantity header-text table-number">
                        {ligneFacture.quantite}
                      </td>
                      <td class="td-unit header-text table-text">
                        {ligneFacture.unite}
                      </td>
                      <td class="td-price header-text table-number">
                        {ligneFacture.prix}
                      </td>
                      <td class="td-line-discount header-text table-number">
                        {ligneFacture.reduction}
                      </td>
                      <td class="td-vat header-text table-number must-show">
                        {ligneFacture.tva}
                      </td>
                      <td class="td-line-total header-text table-number">
                        {(ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction)) /
                          100}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr class="page-break page-break-visited"></tr>
              {/* <!-- yes there should be 2 when using page-break in tr --> */}
              <tr class="page-break page-break-visited"></tr>

              <tr class="page-break page-break-visited"></tr>
              {/* <!-- yes there should be 2 when using page-break in tr --> */}
              <tr class="page-break page-break-visited"></tr>
            </tbody>
          </table>
          <div>
            <hr
              style={{
                display: 'block',
                height: '1px',
                border: '0',
                borderTop: '1px solid #ccc',
                margin: '1em 0',
                padding: '0'
              }}
            />
          </div>
          <div className="page-break page-break-visited">
            <br />
            <br />
          </div>
          {/* code total facture  */}
          <div class="row">
            <div class="col" />
            <div class="col">
              <div class="row">
                <div class="col">Sous-total HT</div>
                <div class="col text-right">
                  {facture.lignesFacture
                    .map(
                      ligneFacture =>
                        (ligneFacture.quantite *
                          ligneFacture.prix *
                          (100 - ligneFacture.reduction)) /
                        100
                    )
                    .reduce(function(a, b) {
                      return a + b;
                    })}
                </div>
              </div>
              {facture.lignesFacture.map((ligneFacture, idx) => {
                if (ligneFacture.tva) {
                  return (
                    <React.Fragment key={idx}>
                      <div class="row">
                        <div class="col">
                          {'TVA ' +
                            ligneFacture.tva +
                            ' % ' +
                            'de ' +
                            ligneFacture.quantite *
                              ligneFacture.prix *
                              (1 - ligneFacture.reduction / 100)}
                        </div>
                        <div class="col">
                          <div class="float-right">
                            {(ligneFacture.quantite *
                              ligneFacture.prix *
                              (100 - ligneFacture.reduction) *
                              ligneFacture.tva) /
                              10000}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })}
              <div class="row">
                <div class="col">
                  <h4>Montant Total EUR</h4>
                </div>
                <div class="col">
                  <div class="float-right">
                    {facture.lignesFacture
                      .map(
                        ligneFacture =>
                          (ligneFacture.quantite *
                            ligneFacture.prix *
                            ((100 - ligneFacture.reduction) * ligneFacture.tva +
                              100 * (100 - ligneFacture.reduction))) /
                          10000
                      )
                      .reduce(function(a, b) {
                        return a + b;
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* fin code total facture */}
        </div>
        <div className="page-break page-break-visited">
          <br />
        </div>
        <div
          className=" conditions base-text"
          style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}
        >
          {facture.conditionFacture}
        </div>
        {/* <div>
          <br />
          <hr
            style={{
              display: 'block',
              height: '1px',
              border: '0',
              borderTop: '1px solid #ccc',
              margin: '1em 0',
              padding: '0'
            }}
          />
        </div> */}
        <footer>
          <div class="footer">
            DUBINFO Avenue de l'optimisme 91 B014 E-mail :
            wemeyijackson@yahoo.fr Téléphone : +33488024498 Site Internet :
            www.site.com n° SIREN / SIRET : siren/siret N° TVA: 8899877766767676
            Banque : BNP PARRIS BAS FORTISZ Code banque: CODEBANQUE N° du
            compte: 34567890654 Titulaire du compte : Kamni tcheudjeu nestor BIC
            : FRGETY IBAN : BE344567676778877889
            <span class="footer-item">DUBINFO</span>
            <span class="footer-item">Avenue de l'optimisme 91 B014</span>
            <span class="footer-item nowrap">
              E-mail :<span>wemeyijackson@yahoo.fr</span>
            </span>
            <span class="nowrap footer-item">
              Téléphone :<span>+33488024498</span>
            </span>
            <span class="nowrap footer-item">
              Site Internet :<span>www.site.com</span>
            </span>
            <span class="nowrap footer-item">
              n° SIREN / SIRET :<span>siren/siret</span>
            </span>
            <span class="nowrap footer-item">
              N° TVA:
              <span>8899877766767676</span>
            </span>
            <span class="nowrap footer-item">
              Banque :<span>BNP PARRIS BAS FORTISZ</span>
            </span>
            <span class="nowrap footer-item">
              Code banque:
              <span>CODEBANQUE</span>
            </span>
            <span class="nowrap footer-item">
              N° du compte:
              <span>34567890654</span>
            </span>
            <span class="nowrap footer-item">
              Titulaire du compte :<span>Kamni tcheudjeu nestor</span>
            </span>
            <span class="nowrap footer-item">
              BIC :<span>FRGETY</span>
            </span>
            <span class="nowrap footer-item">
              IBAN :<span>BE344567676778877889</span>
            </span>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};
export default FacturePreview;
