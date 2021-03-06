import React, { Component } from 'react';
import '../../css/profileCss/profile.css';
class CompanyParam2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfile: this.props.companyProfile,
      logoEntreprise: ''
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name == 'businessTypePrivate') {
      let companyProfile = { ...this.state.companyProfile };
      companyProfile[name] = value;
      companyProfile['businessTypeCompany'] = !value;
      this.setState({ companyProfile });
    } else if (name == 'businessTypeCompany') {
      let companyProfile = { ...this.state.companyProfile };
      companyProfile[name] = value;
      companyProfile['businessTypePrivate'] = !value;
      this.setState({ companyProfile });
    } else {
      let companyProfile = { ...this.state.companyProfile };
      companyProfile[name] = value;
      this.setState({ companyProfile });
    }
  };
  handleSubmit = event => {
    this.props.updateCompanyParam(this.state.companyProfile);
    event.preventDefault();
  };
  // Uploads files and push's objects containing metadata to database at dbPath
  onFileInput = files => {
    this.setState({ logoEntreprise: 'input' });
    // uploadFiles(storagePath, files, dbPath)
    const { companyLogo } = this.props;
    const filesPath = this.props.uid;
    const firebase = this.props.firebase;
    if (companyLogo) {
      firebase
        .deleteFile(
          companyLogo[0].value.fullPath,
          `${filesPath}/${companyLogo[0].key}`
        )
        .then(() => {
          firebase.uploadFiles(filesPath, files, filesPath);
        });
    } else {
      this.props.firebase.uploadFiles(filesPath, files, filesPath);
    }
    //return this.props.firebase.uploadFiles(filesPath, files, filesPath).then((res)=>{console.log(res)});
  };

  // Deletes file and removes metadata from database
  onFileDelete = (file, key) => {
    this.setState({ logoEntreprise: 'delete' });
    // deleteFile(storagePath, dbPath)
    const filesPath = this.props.uid;
    //return this.props.firebase.deleteFile(file.fullPath,null);
    return this.props.firebase
      .deleteFile(file.fullPath, `${filesPath}/${key}`)
      .then(() => {
        this.fileInput.value = '';
      });
  };

  render() {
    //console.log(this.state.companyProfile.businessTypePrivate);
    //console.log(this.state.companyProfile.businessTypeCompany);
    const { logoEntreprise } = this.state;
    const { companyLogo } = this.props;
    const srcImg = companyLogo
      ? companyLogo[0].value.downloadURL
      : require('../layout/spinner.gif');
    const logoCompany1 = companyLogo ? (
      <React.Fragment>
        <div class="imagePreview">
          <div class="imageRemove">
            <i
              class="fas fa-times app-icns icn-svg-remove-img"
              onClick={() =>
                this.onFileDelete(companyLogo[0].value, companyLogo[0].key)
              }
            ></i>
          </div>
          <span class="imageEmpty hidden">T??l??charger le logo</span>
          <img src={companyLogo[0].value.downloadURL} alt="" class="" />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div class="imagePreview empty">
          <div class="imageRemove hidden">
            <i class="fas fa-times app-icns icn-svg-remove-img"></i>
          </div>
          <span class="imageEmpty">T??l??charger le logo</span>
          <img src={require('../layout/spinner.gif')} alt="" class="hidden" />
        </div>
      </React.Fragment>
    );
    const logoCompany2 = companyLogo ? (
      <React.Fragment>
        <div class="imagePreview">
          <div class="imageRemove">
            <i
              class="fas fa-times app-icns icn-svg-remove-img"
              onClick={() =>
                this.onFileDelete(companyLogo[0].value, companyLogo[0].key)
              }
            ></i>
          </div>
          <img src={srcImg} alt="" class="" />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div class="imagePreview">
          <img src={require('../layout/spinner.gif')} alt="" class="" />
        </div>
      </React.Fragment>
    );
    const logoCompany3 = companyLogo ? (
      <React.Fragment>
        <div class="imagePreview">
          <img src={require('../layout/spinner.gif')} alt="" class="" />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div class="imagePreview empty">
          <span class="imageEmpty">T??l??charger le logo</span>
        </div>
      </React.Fragment>
    );
    const logoCompany = function() {
      if (logoEntreprise == 'input') {
        return logoCompany2;
      } else if (logoEntreprise == 'delete') {
        return logoCompany3;
      } else {
        return logoCompany1;
      }
    };
    return (
      <div class="app">
        <div class="app--container">
          <div class="app--header">
            <div class="flx-row align-justify css-ptoqev">
              <h2 class="title-bar-title css-13thv8x-heading-heading--giga-heading--no-margin erjtaf20">
                Entreprise
              </h2>
            </div>
          </div>
          <div id="app" class="app--content-container">
            <div class="settings company-profile">
              <section class="content-placeholder">
                <div class="content ptl">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row company-details">
                      <div className="col-sm-3">
                        <h3>Coordonn??es de l'entreprise</h3>
                      </div>
                      <div className="col-sm-9">
                        <label>Structure de ton entreprise</label>
                        <div className="business-type-choise">
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="businessTypeCompany"
                              id="businessTypeCompany"
                              //value="Company"
                              checked={
                                this.state.companyProfile.businessTypeCompany
                              }
                              onChange={this.handleInputChange}
                            />
                            <label
                              for="businessTypeCompany"
                              className="custom-control-label"
                            >
                              Soci??t??
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="businessTypePrivate"
                              id="businessTypePrivate"
                              //value="Private"
                              checked={
                                this.state.companyProfile.businessTypePrivate
                              }
                              onChange={this.handleInputChange}
                            />
                            <label
                              for="businessTypePrivate"
                              className="custom-control-label"
                            >
                              Entreprise individuelle
                            </label>
                          </div>
                        </div>
                        <div className="row flx-row row-collapse mbl">
                          <div className="col columns prxxl">
                            <div className="row flx-row mbm businessPrivateOnly">
                              <div
                                className="col form-group columns prm"
                                className="col form-group columns prm"
                                hidden={
                                  !this.state.companyProfile.businessTypePrivate
                                }
                              >
                                <label for="prenomProfil">Pr??nom</label>
                                <input
                                  type="text"
                                  name="prenomProfil"
                                  className="form-control textInput"
                                  id="prenomProfil"
                                  data-bind="prenomProfil"
                                  value={this.state.companyProfile.prenomProfil}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div
                                className="col form-group columns plm"
                                className="col form-group columns prm"
                                hidden={
                                  !this.state.companyProfile.businessTypePrivate
                                }
                              >
                                <label for="nomProfil">Nom</label>
                                <input
                                  type="text"
                                  name="nomProfil"
                                  className="form-control textInput"
                                  id="nomProfil"
                                  data-bind="nomProfil"
                                  value={this.state.companyProfile.nomProfil}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                            <div class="industry mbm">
                              <div>
                                <label for="industry">Branche</label>
                                <select
                                  id="branche"
                                  name="branche"
                                  class="custom-select select2-offscreen"
                                  value={this.state.companyProfile.branche}
                                  onChange={this.handleInputChange}
                                >
                                  <option class="opt-clear" value="">
                                    [Choisir un secteur]
                                  </option>
                                  <option value="Accommodation">
                                    Accommodation
                                  </option>
                                  <option value="Accounting">Accounting</option>
                                  <option value="Advertising">
                                    Advertising
                                  </option>
                                  <option value="Agriculture">
                                    Agriculture
                                  </option>
                                  <option value="Arts and Entertainment">
                                    Arts and Entertainment
                                  </option>
                                  <option value="Bookkeeping">
                                    Bookkeeping
                                  </option>
                                  <option value="Cleaning">Cleaning</option>
                                  <option value="Construction">
                                    Construction
                                  </option>
                                  <option value="Consulting">Consulting</option>
                                  <option value="Crafts">Crafts</option>
                                  <option value="Education">Education</option>
                                  <option value="Financial Services">
                                    Financial Services
                                  </option>
                                  <option value="Gardening and Landscaping">
                                    Gardening and Landscaping
                                  </option>
                                  <option value="Health Care">
                                    Health Care
                                  </option>
                                  <option value="IT Services">
                                    IT Services
                                  </option>
                                  <option value="Legal Services">
                                    Legal Services
                                  </option>
                                  <option value="Manufacturing">
                                    Manufacturing
                                  </option>
                                  <option value="Mechanical Engineering">
                                    Mechanical Engineering
                                  </option>
                                  <option value="Publishing">Publishing</option>
                                  <option value="Real Estate">
                                    Real Estate
                                  </option>
                                  <option value="Restaurant">Restaurant</option>
                                  <option value="Retail (offline and online)">
                                    Retail (offline and online)
                                  </option>
                                  <option value="Retail (offline)">
                                    Retail (offline)
                                  </option>
                                  <option value="Retail (online)">
                                    Retail (online)
                                  </option>
                                  <option value="Sports">Sports</option>
                                  <option value="Telecommunications">
                                    Telecommunications
                                  </option>
                                  <option value="Transportation">
                                    Transportation
                                  </option>
                                  <option value="Travel Agency">
                                    Travel Agency
                                  </option>
                                  <option value="Wholesale">Wholesale</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col columns prxxl">
                            <div className="form-group name mbm">
                              <label for="nomEntreprise">
                                Nom de l'entreprise
                                <em class="mandatoryIcon weak"></em>
                              </label>
                              <input
                                maxlength="100"
                                type="text"
                                className="form-control first-focus-target textInput no-scroll"
                                name="nomEntreprise"
                                data-bind="nomEntreprise"
                                id="nomEntreprise"
                                value={this.state.companyProfile.nomEntreprise}
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="compositeInput">
                              <div
                                className="form-group address"
                                style={{ margin: '0' }}
                              >
                                <label for="adresseEntreprise">
                                  Adresse{' '}
                                  <em className="mandatoryIcon weak prs"></em>
                                </label>
                                <textarea
                                  placeholder="Saisir ton adresse compl??te"
                                  maxlength="200"
                                  rows="25"
                                  cols="25"
                                  name="adresseEntreprise"
                                  data-bind="adresseEntreprise"
                                  id="adresseEntreprise"
                                  className="form-control autogrow"
                                  style={{ height: '78px' }}
                                  value={
                                    this.state.companyProfile.adresseEntreprise
                                  }
                                  onChange={this.handleInputChange}
                                ></textarea>
                              </div>
                              <input
                                type="text"
                                disabled="disabled"
                                className="form-control textInput"
                                value="Belgique"
                                style={{ margin: '0' }}
                              />
                            </div>
                          </div>
                          <div className="col columns">
                            <div className="form-group email mbm">
                              <label for="emailEntreprise">
                                E-mail<em class="mandatoryIcon weak"></em>
                              </label>
                              <input
                                maxlength="128"
                                type="text"
                                className="form-control textInput"
                                name="emailEntreprise"
                                data-bind="emailEntreprise"
                                id="emailEntreprise"
                                value={
                                  this.state.companyProfile.emailEntreprise
                                }
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="form-group telephoneNumber mbm">
                              <label for="telephoneNumberEnt">T??l??phone</label>
                              <input
                                maxlength="25"
                                type="text"
                                className="form-control textInput"
                                name="telephoneNumberEnt"
                                data-bind="telephoneNumberEnt"
                                id="telephoneNumberEnt"
                                value={
                                  this.state.companyProfile.telephoneNumberEnt
                                }
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="form-group webSite">
                              <label for="webSite">Site Internet</label>
                              <input
                                maxlength="50"
                                type="text"
                                className="form-control textInput"
                                name="webSite"
                                data-bind="webSite"
                                id="webSite"
                                value={this.state.companyProfile.webSite}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="separator"></div>
                    <div class="row company-logo">
                      <div class="col-sm-3 cell left">
                        <h3>Logo de l'entreprise</h3>
                      </div>
                      <div class="col-sm-9 cell middle">
                        <div class="imageUploadCtrl">
                          {/* <form
                            class="imageUploadForm"
                            enctype="multipart/form-data"
                            method="post"
                            onsubmit="return false"
                            action="undefined"
                            encoding="multipart/form-data"
                          > */}
                          {logoCompany()}

                          <div class="imageStatus"></div>
                          <input
                            id="imageUpload"
                            class="imageUpload textInput"
                            type="file"
                            name="file"
                            accept="image/jpeg, image/gif, image/png"
                            ref={ref => (this.fileInput = ref)}
                            onChange={e => this.onFileInput(e.target.files)}
                          />
                          {/* </form> */}
                        </div>
                      </div>
                    </div>

                    <div class="separator"></div>

                    <div class="row tax-registration">
                      <div class="col-sm-3 cell left">
                        <h3>Num??ro d'identification et de TVA</h3>
                      </div>
                      <div class="col-sm-9 cell middle">
                        <div class="row">
                          <div class="col cell s1of2 prm">
                            <div class="form-group ctrlHolder companyNumber">
                              <label for="companyNumber">SIREN/SIRET</label>
                              <input
                                maxlength="20"
                                type="text"
                                class="form-control textInput"
                                name="companyNumber"
                                data-bind="companyNumber"
                                id="companyNumber"
                                value={this.state.companyProfile.companyNumber}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="col cell s1of2 plm">
                            <div class="form-group ctrlHolder vatNumber">
                              <label for="vatNumber">N?? TVA</label>
                              <input
                                maxlength="20"
                                type="text"
                                class="form-control textInput"
                                name="vatNumber"
                                data-bind="vatNumber"
                                id="vatNumber"
                                value={this.state.companyProfile.vatNumber}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="separator"></div>
                    <div class="row bank-payment">
                      <div class="col-sm-3 cell left">
                        <h3>
                          Coordonn??es de la banque et r??f??rences bancaires
                        </h3>
                      </div>
                      <div class="col-sm-9 cell middle">
                        <div class="form-group ctrlHolder bankName">
                          <label for="bankName">Banque</label>
                          <input
                            maxlength="90"
                            type="text"
                            class=" form-control textInput"
                            name="bankName"
                            data-bind="bankName"
                            id="bankName"
                            value={this.state.companyProfile.bankName}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div class="form-group ctrlHolder accountHolderName">
                          <label for="accountHolderName">
                            Titulaire du compte
                          </label>
                          <input
                            maxlength="50"
                            type="text"
                            class="form-control textInput"
                            name="accountHolderName"
                            data-bind="accountHolderName"
                            id="accountHolderName"
                            value={this.state.companyProfile.accountHolderName}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div class="row">
                          <div class="col cell s1of2 prm">
                            <div class="form-group ctrlHolder bankNumber">
                              <label for="bankNumber">Code banque</label>
                              <input
                                maxlength="50"
                                type="text"
                                class="form-control textInput"
                                name="bankNumber"
                                data-bind="bankNumber"
                                id="bankNumber"
                                value={this.state.companyProfile.bankNumber}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="col cell s1of2 plm">
                            <div class="ctrlHolder bankAccount">
                              <label for="bankAccount">N?? du compte</label>
                              <input
                                maxlength="50"
                                type="text"
                                class="form-control textInput"
                                name="bankAccount"
                                data-bind="bankAccount"
                                id="bankAccount"
                                value={this.state.companyProfile.bankAccount}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col cell s1of2 prm">
                            <div class="form-group ctrlHolder swiftCode">
                              <label for="swiftCode">Code BIC</label>
                              <input
                                maxlength="20"
                                type="text"
                                class="form-control textInput"
                                name="swiftCode"
                                data-bind="swiftCode"
                                id="swiftCode"
                                value={this.state.companyProfile.swiftCode}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="col cell s1of2 plm">
                            <div class="form-group ctrlHolder ibanCode">
                              <label for="ibanCode">N?? IBAN</label>
                              <input
                                maxlength="50"
                                type="text"
                                class="form-control textInput"
                                name="ibanCode"
                                data-bind="ibanCode"
                                id="ibanCode"
                                value={this.state.companyProfile.ibanCode}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-right">
                      Enregistrer
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyParam2;
