import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { resetPassword } from '../../store/actions/authActions';
//import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.resetPassword(this.state);

    /* const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser('Invalid Login Credentials', 'error')); */
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { resetMessage, messageType } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {resetMessage ? (
                <Alert message={resetMessage} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Reset Password
                </span>
              </h1>
              <p className="text-center">
                Please enter your email address below and we will send you
                information to recover your account
              </p>
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
                {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div> */}
                <input
                  type="submit"
                  value="Reset Password"
                  className="btn btn-primary btn-block"
                />
              </form>
              <div className="text-center mt-2">
                <Link to="/signin">
                  <i class="far fa-arrow-alt-circle-left" /> Sign In
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

/* export default  compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
) ( ResetPassword);
 */
const mapStateToProps = state => {
  return {
    resetMessage: state.facture.factureMessage,
    messageType: state.facture.messageType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetPassword: creds => dispatch(resetPassword(creds))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
