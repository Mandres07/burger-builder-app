import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ closed, open, isAuth }) => {
   let attachedClasses = [classes.SideDrawer, classes.Close];
   if (open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
   }
   return (
      <Auxiliary>
         <Backdrop show={open} dismiss={closed} />
         <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
               <Logo />
            </div>
            <nav>
               <NavigationItems isAuthenticated={isAuth} />
            </nav>
         </div>
      </Auxiliary>
   );
}

export default SideDrawer;