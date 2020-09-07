import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import '../../css/navBarCss/signedInLinks.css';
const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/facture/new" className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-file-invoice"></i>
            </div>
            <span class="customizable-nav__label">Nouvelle Facture</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/devis" className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-file-contract"></i>{' '}
            </div>
            <span class="customizable-nav__label">Devis</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/clients" className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-address-book"></i>
            </div>
            <span class="customizable-nav__label">Clients</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/produits" className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-box"></i>
            </div>
            <span class="customizable-nav__label">Produits</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/compte/profile" className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-cog"></i>
            </div>
            <span class="customizable-nav__label">Parametres</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="#" onClick={props.signOut} className="nav-link">
          <div className="navbar-brand">
            <div class="customizable-nav__icon-place">
              <i class="fas fa-sign-out-alt"></i>{' '}
            </div>
            <span class="customizable-nav__label">Log Out</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <div className="navbar-brand" id="brand">
            <div className="customizable-nav__icon-place">
              <button
                type="button"
                className="btn btn-light rounded-circle nav-link text-dark"
              >
                {props.profile.initials}
              </button>
            </div>
            {/* <span className="customizable-nav__label1">{props.auth.email}</span> */}
          </div>
        </Link>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
