import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {

   return (
      <div className={classes.CheckoutSummary}>
         <h1>We hope it taste gooooood!</h1>
         <div style={{ width: '100%', margin: 'auto' }}>
            <Burger ingredients={ingredients} />
         </div>
         <Button btnType='Danger' click={checkoutCancelled}>CANCEL</Button>
         <Button btnType='Success' click={checkoutContinued} >CONTINUE</Button>
      </div>
   );
}

export default CheckoutSummary;