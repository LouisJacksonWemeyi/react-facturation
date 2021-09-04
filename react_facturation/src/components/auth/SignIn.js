import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signIn } from '../../store/actions/authActions';
//import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';
import logo from '../images/facdev.png';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);

    /* const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser('Invalid Login Credentials', 'error')); */
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { authError, messageType } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <img
            class="card-img-top rounded imgcenter"
            src={logo}
            alt="appsLogo"
            style={{ width: '256px', height: '128px' }}
          />
          <div class="card-body">
            <h4 class="card-title text-primary" style={{ textAlign: 'center' }}>
              Créer vos factures et devis en ligne
            </h4>
          </div>
          &nbsp;
          <div className="card">
            <div className="card-body">
              {authError ? (
                <Alert message={authError} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Se Connecter
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
              <div className="text-center mt-2">
                <span className="text-primary">
                  <Link to={'/passwordReset'}>
                    Mot de passe oublié ?{' '}
                    <i class="far fa-arrow-alt-circle-right" />
                  </Link>{' '}
                </span>
              </div>
              <div className="text-center">
                <span className="text-primary">
                  <Link to={'/signUp'}>
                    Créer un compte <i class="far fa-arrow-alt-circle-right" />
                  </Link>{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}; */

/* export default  compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
) ( SignIn);
 */
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    messageType: state.auth.messageType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
