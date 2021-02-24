import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions/actions';


class BurgerBuilder extends Component {
   state = {
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      // axios.get('ingredients.json')
      //    .then(response => {
      //       this.setState({ ingredients: response.data });
      //    })
      //    .catch(err => {
      //       this.setState({ error: true });
      //    });
   }

   updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map((igKey) => {
            return ingredients[igKey];
         })
         .reduce((accumulate, el) => {
            return accumulate + el;
         }, 0);
      return sum > 0;
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true });
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   }

   purchaseContinueHandler = () => {
      // // DE ESTA FORMA SE PASAN PARAMETROS A TRAVEZ DE QUERY PARAMS con el react-router-dom
      // const queryParams = [];
      // for (let i in this.props.ings) {
      //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
      // }
      // queryParams.push('price=' + this.props.price);
      // const queryString = queryParams.join('&');
      // this.props.history.push({
      //    pathname: '/checkout',
      //    search: '?' + queryString
      // });
      this.props.history.push('/checkout');
   }

   render() {
      const disabledInfo = {
         ...this.props.ings
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

      if (this.props.ings) {
         burger = (
            <Auxiliary>
               <Burger ingredients={this.props.ings} />
               <BuildControls price={this.props.price} disabled={disabledInfo} ingredientAdded={this.props.onIngredientAdded}
                  purchasable={this.updatePurchaseState(this.props.ings)} ordered={this.purchaseHandler} ingredientRemoved={this.props.onIngredientRemoved} />
            </Auxiliary>
         );
         orderSummary = (
            <OrderSummary totalPrice={this.props.price} ingredients={this.props.ings}
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

const mapStateToProps = state => {
   return {
      ings: state.ingredients,
      price: state.totalPrice
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
      onIngredientRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));