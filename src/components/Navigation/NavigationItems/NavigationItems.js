import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuthenticated }) => {
   return (
      <ul className={classes.NavigationItems}>
         <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
         {isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
         {isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Authenticate</NavigationItem>
         }
      </ul>
   );
}

export default NavigationItems;