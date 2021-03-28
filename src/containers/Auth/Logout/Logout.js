import React, { useEffect } from 'react';
import { logOut } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Logout = props => {
   const { onLogout } = props;

   useEffect(() => {
      onLogout();
   }, [onLogout]);

   return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
   return {
      onLogout: () => dispatch(logOut())
   };
};

export default connect(null, mapDispatchToProps)(Logout);