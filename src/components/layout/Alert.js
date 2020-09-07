import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';
import { clearFactureState } from '../../store/actions/alertActions.js';
import { connect } from 'react-redux';

const Alert = (props) => {
  const { message, messageType } = props;
  //const color = messageType === 'error' ? 'red' : 'green';
  return (
    <React.Fragment>
      {message ? (
        messageType === 'success' ? (
          <div
            class="alert alert-success alert-dismissible fade show"
            //style={{ left: '40%', top: '10%', position: 'fixed' }}
          >
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              onClick={() => props.clearFactureState()}
            >
              &times;
            </button>
            <strong>Success! </strong>
            {message}.
          </div>
        ) : (
          <div
            class="alert alert-danger alert-dismissible fade show"
            //style={{ left: '50%', top: '10%', position: 'fixed' }}
          >
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              onClick={() => props.clearFactureState()}
            >
              &times;
            </button>
            <strong>Error! </strong> {message}.
          </div>
        )
      ) : null}
    </React.Fragment>
  );

  /* (
     <div
      className={classnames('alert', {
        'alert-success': messageType === 'success',
        'alert-danger': messageType === 'error',
      })}
      //style={{ position: 'absolute' }}
    >
      {messageType == 'success' ? (
        <strong>Success! </strong>
      ) : (
        <strong>Error! </strong>
      )}
      {message}
      <button
        type="button"
        class="close"
        //data-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          props.clearFactureState();
          //window.location.reload();
        }}
      >
        <span aria-hidden="true" style={{ color: color }}>
          <i class="far fa-times-circle"></i>
        </span>
      </button>
    </div> 
  ); */
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFactureState: () => dispatch(clearFactureState()),
  };
};
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Alert);
