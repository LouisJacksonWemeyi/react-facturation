import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
//import { notifyUser } from '../../actions/notifyActions';
import { signUp } from '../../store/actions/authActions';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  };

  /*  componentWillMount() {
    const { allowRegistration } = this.props.settings;

    if (!allowRegistration) {
      this.props.history.push('/');
    }
  } */

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    //console.log(this.state);

    /*  const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('That User Already Exists', 'error'));
   */
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    //const { message, messageType } = this.props.notify;
    const { authError, messageType } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {authError ? (
                <Alert message={authError} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> S'enregistrer
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
                <div className="form-group">
                  <label htmlFor="firstName">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Prenom</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="role" for="role">
                    Role
                  </label>
                  <select
                    value={this.state.role}
                    onChange={this.onChange}
                    className="form-control"
                    name="role"
                  >
                    <option value="pro">professionnel</option>
                    <option value="user">client</option>
                  </select>
                </div>
                <input
                  type="submit"
                  value="S'enregistrer"
                  className="btn btn-primary btn-block"
                />
              </form>
              <div className="text-center mt-2">
                <Link to="/signin">
                  <i class="far fa-arrow-alt-circle-left" /> Se connecter
                </Link>
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

/*export default  compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)  SignUp;*/

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    messageType: state.auth.messageType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
