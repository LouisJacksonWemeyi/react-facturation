import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import ClientSignedInLinks from './ClientSignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import logo from '../images/facdev.png';

class AppNavbar extends Component {
  state = {
    langue: 'FR',
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { auth, profile } = this.props;
    console.log(auth);
    const links = function () {
      if (profile.role === 'user') {
        return <ClientSignedInLinks profile={profile} auth={auth} />;
      } else if (profile.role === 'pro') {
        return <SignedInLinks profile={profile} auth={auth} />;
      } else {
        return <SignedOutLinks />;
      }
    };

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              class="card-img-top rounded"
              src={logo}
              alt="appsLogo"
              style={{ width: '100px', height: '50px' }}
            />
            <br />
            {/* <span>FacturationPanel</span> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <a>
                  <select
                    value={this.state.langue}
                    onChange={this.onChange}
                    className="form-control-sm mt-2"
                    name="langue"
                  >
                    <option value="fr">FR</option>
                    <option value="nl">NL</option>
                  </select>
                </a>
              </li>
            </ul>
            {links()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(AppNavbar);
