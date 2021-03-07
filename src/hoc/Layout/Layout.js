import React, { useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
   const [showSideDrawer, setShowSideDrawer] = useState(false);

   const sideDrawerClosedHandler = () => {
      setShowSideDrawer(false);
   };

   const toggleSideDrawerHandler = () => {
      setShowSideDrawer(prevState => !prevState);
   };

   return (
      <Auxiliary>
         <Toolbar toggleSideDrawer={toggleSideDrawerHandler} isAuth={props.isAuthenticated} />
         <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
         <main className={classes.Content}>
            {props.children}
         </main>
      </Auxiliary>
   );
};

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null
   };
};

export default connect(mapStateToProps)(Layout);