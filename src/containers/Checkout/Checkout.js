import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { purchaseInit } from '../../store/actions/index'

class Checkout extends Component {
   // state = {
   //    ingredients: null,
   //    totalPrice: 0
   // }

   // // ASI SE OBTIENEN LOS QUERY PARAMS QUE SE PASARON
   // componentDidMount() {
   //    const query = new URLSearchParams(this.props.location.search);
   //    const ingredients = {};
   //    let price = 0;
   //    for (let param of query.entries()) {
   //       if (param[0] === 'price') {
   //          price = param[1];
   //       }
   //       else {
   //          ingredients[param[0]] = +param[1];
   //       }
   //    }
   //    this.setState({ ingredients: ingredients, totalPrice: price });
   // }

   // componentDidMount() {
   //    this.props.onInitPurchase();
   // }

   checkoutCancelledHandler = () => {
      this.props.history.goBack();
   };

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   };

   render() {
      const purchasedRedirect = this.props.ings ? (this.props.purchased ? <Redirect to='/' /> : null) : null;
      return (
         <div>
            {purchasedRedirect}
            {this.props.ings ? <div>
               <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} />
               {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ings} totalPrice={this.props.price} {...props} />)} /> */}
               <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div> : null}

         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.orders.purchase
   };
};

export default connect(mapStateToProps)(Checkout);