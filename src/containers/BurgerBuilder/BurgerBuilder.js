import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, initIngredients, purchaseInit, removeIngredient, setAuthRedirectPath } from '../../store/actions/index';


export const BurgerBuilder = props => {
   const [purchasing, setPurchasing] = useState(false);

   const ings = useSelector(state => state.burgerBuilder.ingredients);
   const price = useSelector(state => state.burgerBuilder.totalPrice);
   const error = useSelector(state => state.burgerBuilder.error);
   const isAuthenticated = useSelector(state => state.auth.token !== null);

   const dispatch = useDispatch();

   const onIngredientAdded = (ingName) => dispatch(addIngredient(ingName));
   const onIngredientRemoved = (ingName) => dispatch(removeIngredient(ingName));
   const onInitIngredients = useCallback(() => dispatch(initIngredients()), []);
   const onInitPurchase = () => dispatch(purchaseInit());
   const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

   useEffect(() => {
      onInitIngredients();
   }, [onInitIngredients]);

   const updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map((igKey) => {
            return ingredients[igKey];
         })
         .reduce((accumulate, el) => {
            return accumulate + el;
         }, 0);
      return sum > 0;
   }

   const purchaseHandler = () => {
      if (isAuthenticated) {
         setPurchasing(true);
      }
      else {
         onSetAuthRedirectPath('/checkout');
         props.history.push('/auth');
      }
   }

   const purchaseCancelHandler = () => {
      setPurchasing(false);
   }

   const purchaseContinueHandler = () => {
      onInitPurchase();
      props.history.push('/checkout');
   }

   const disabledInfo = {
      ...ings
   };
   for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
   }
   let orderSummary = null;
   let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

   if (ings) {
      burger = (
         <Auxiliary>
            <Burger ingredients={ings} />
            <BuildControls price={price} disabled={disabledInfo} ingredientAdded={onIngredientAdded} isAuth={isAuthenticated}
               purchasable={updatePurchaseState(ings)} ordered={purchaseHandler} ingredientRemoved={onIngredientRemoved} />
         </Auxiliary>
      );
      orderSummary = (
         <OrderSummary totalPrice={price} ingredients={ings}
            purchaseCancelled={purchaseCancelHandler} purchaseContinued={purchaseContinueHandler} />
      );
   }

   return (
      <Auxiliary>
         <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
            {orderSummary}
         </Modal>
         {burger}
      </Auxiliary>
   );
}


export default withErrorHandler(BurgerBuilder, axios);