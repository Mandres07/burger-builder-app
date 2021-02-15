import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, purchaseCancelled, purchaseContinued, totalPrice }) => {
   const ingredientsSummary = Object.keys(ingredients).map((igKey, i) => {
      if (ingredients[igKey] > 0) {
         return (
            <li key={i.toString()}>
               <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
               {ingredients[igKey]}
            </li>
         );
      }
   });

   return (
      <Auxiliary>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>
            {ingredientsSummary}
         </ul>
         <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
         <p>Continue to Checkout?</p>
         <Button btnType='Danger' click={purchaseCancelled}>CANCEL</Button>
         <Button btnType='Success' click={purchaseContinued}>CONTINUE</Button>
      </Auxiliary>
   );
}

export default OrderSummary;