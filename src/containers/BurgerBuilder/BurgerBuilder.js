import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { act } from 'react-dom/test-utils';

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
      totalPrice: 4
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
            <Burger ingredients={this.state.ingredients} />
            <BuildControls price={this.state.totalPrice} disabled={disabledInfo} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} />
         </Auxiliary>
      );
   }
}

export default BurgerBuilder;