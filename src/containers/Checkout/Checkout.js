import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

   const checkoutCancelledHandler = () => {
      props.history.goBack();
   };

   const checkoutContinuedHandler = () => {
      props.history.replace('/checkout/contact-data');
   };

   const purchasedRedirect = props.ings ? (props.purchased ? <Redirect to='/' /> : null) : null;
   return (
      <div>
         {purchasedRedirect}
         {props.ings ? <div>
            <CheckoutSummary ingredients={props.ings} checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler} />
            <Route path={props.match.path + '/contact-data'} component={ContactData} />
         </div> : null}

      </div>
   );
}

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.orders.purchase
   };
};

export default connect(mapStateToProps)(Checkout);