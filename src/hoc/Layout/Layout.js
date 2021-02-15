import React, { useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
         <Toolbar toggleSideDrawer={toggleSideDrawerHandler} />
         <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
         <main className={classes.Content}>
            {props.children}
         </main>
      </Auxiliary>
   );
}

export default Layout;