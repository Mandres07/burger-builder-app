import React from 'react';
import classes from './DrawerToggle.module.css';

const DrawerToggle = ({ drawerToggleClick }) => {
   return (
      <div className={classes.DrawerToggle} onClick={drawerToggleClick}>
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
}

export default DrawerToggle;