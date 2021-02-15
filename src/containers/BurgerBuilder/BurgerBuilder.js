import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

class BurgerBuilder extends Component {
   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
   }

   addIngredientHandler = (type) => {
      const updatedCount = this.state.ingredients[type] + 1;
      const updatedIngredients = {
         ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddtition = INGREDIENT_PRICES[type];
      const newPrice = this.state.totalPrice + priceAddtition
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) => {
      const actualCount = this.state.ingredients[type];
      if (actualCount <= 0) {
         return;
      }
      const updatedCount = actualCount - 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const price = INGREDIENT_PRICES[type];
      const newPrice = this.state.totalPrice - price;
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngredients);
   }

   updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map((igKey) => {
            return ingredients[igKey];
         })
         .reduce((accumulate, el) => {
            return accumulate + el;
         }, 0);
      this.setState({ purchasable: sum > 0 });
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true });
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   }

   purchaseContinueHandler = () => {
      alert('You continue!');
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      return (
         <Auxiliary>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               <OrderSummary totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}
                  purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls price={this.state.totalPrice} disabled={disabledInfo} ingredientAdded={this.addIngredientHandler}
               purchasable={this.state.purchasable} ordered={this.purchaseHandler} ingredientRemoved={this.removeIngredientHandler} />
         </Auxiliary>
      );
   }
}

export default BurgerBuilder;