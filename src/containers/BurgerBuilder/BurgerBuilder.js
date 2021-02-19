import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

class BurgerBuilder extends Component {
   state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      axios.get('ingredients.json')
         .then(response => {
            this.setState({ ingredients: response.data });
         })
         .catch(err => {
            this.setState({ error: true });
         });
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
      const queryParams = [];
      for (let i in this.state.ingredients) {
         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      }
      queryParams.push('price=' + this.state.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
         pathname: '/checkout',
         search: '?' + queryString
      });
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

      if (this.state.ingredients) {
         burger = (
            <Auxiliary>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls price={this.state.totalPrice} disabled={disabledInfo} ingredientAdded={this.addIngredientHandler}
                  purchasable={this.state.purchasable} ordered={this.purchaseHandler} ingredientRemoved={this.removeIngredientHandler} />
            </Auxiliary>
         );
         orderSummary = (
            <OrderSummary totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}
               purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />
         );
      }

      if (this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Auxiliary>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
               {orderSummary}
            </Modal>
            {burger}
         </Auxiliary>
      );
   }
}

export default withErrorHandler(BurgerBuilder, axios);