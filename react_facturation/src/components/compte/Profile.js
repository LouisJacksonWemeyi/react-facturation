import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { updateCompanyParam } from '../../store/parametresAction.js';
import '../../css/profileCss/profile.css';
import CompanyParam1 from './CompanyParam1.js';
import CompanyParam2 from './CompanyParam2.js';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfile: {
        businessTypePrivate: true,
        businessTypeCompany: false,
        nomProfil: '',
        prenomProfil: '',
        branche: '',
        adresseEntreprise: '',
        nomEntreprise: '',
        emailEntreprise: '',
        telephoneNumberEnt: '',
        webSite: '',
        companyNumber: '',
        vatNumber: '',
        bankName: '',
        accountHolderName: '',
        bankNumber: '',
        bankAccount: '',
        swiftCode: '',
        ibanCode: ''
      },
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
    const { userAuth, companyLogo, updateCompanyParam } = this.props;
    const companyProfile = {
      businessTypePrivate: true,
      businessTypeCompany: false,
      nomProfil: '',
      prenomProfil: '',
      branche: '',
      adresseEntreprise: '',
      nomEntreprise: '',
      emailEntreprise: '',
      telephoneNumberEnt: '',
      webSite: '',
      companyNumber: '',
      vatNumber: '',
      bankName: '',
      accountHolderName: '',
      bankNumber: '',
      bankAccount: '',
      swiftCode: '',
      ibanCode: ''
    };

    const EntrepriseData = userAuth ? (
      <CompanyParam1
        companyLogo={companyLogo}
        companyProfile={userAuth.companyData}
        updateCompanyParam={updateCompanyParam}
      />
    ) : (
      <CompanyParam2
        companyLogo={companyLogo}
        companyProfile={companyProfile}
        updateCompanyParam={updateCompanyParam}
      />
    );

    return <React.Fragment>{EntrepriseData}</React.Fragment>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyParam: param => dispatch(updateCompanyParam(param))
  };
};

const mapStateToProps = state => {
  //console.log(state);
  const userId = state.firebase.auth.uid;
  return {
    uid: userId,
    companyLogo: state.firebase.ordered && state.firebase.ordered[userId],
    userAuth: state.firestore.ordered.users && state.firestore.ordered.users[0]
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [{ collection: 'users', doc: props.uid }]),
  firebaseConnect(props => {
    return [{ path: props.uid }];
  })
)(Profile);
