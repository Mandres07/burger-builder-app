import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ children, link, exact }) => {
   return (
      <li className={classes.NavigationItem}>
         <NavLink activeClassName={classes.active} to={link} exact={exact}>{children}</NavLink>
      </li>
   );
}

export default NavigationItem;