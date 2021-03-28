import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

const ContactData = props => {
   const [orderForm, setOrderForm] = useState({
      name: {
         elementType: 'input',
         elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
         },
         value: '',
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      street: {
         elementType: 'input',
         elementConfig: {
            type: 'text',
            placeholder: 'Street'
         },
         value: '',
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      zipCode: {
         elementType: 'input',
         elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
         },
         value: '',
         validation: {
            required: true,
            minLength: 5,
            maxLength: 5
         },
         valid: false,
         touched: false
      },
      country: {
         elementType: 'input',
         elementConfig: {
            type: 'text',
            placeholder: 'Country'
         },
         value: '',
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      email: {
         elementType: 'input',
         elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
         },
         value: '',
         validation: {
            required: true,
            isEmail: true
         },
         valid: false,
         touched: false
      },
      deliveryMethod: {
         elementType: 'select',
         elementConfig: {
            options: [
               { value: 'fastest', displayValue: 'Fastest' },
               { value: 'cheapest', displayValue: 'Cheapest' },
            ]
         },
         value: 'fastest',
         validation: {},
         valid: true
      }
   });

   const [formIsValid, setFormIsValid] = useState(false);

   const orderHandler = (event) => {
      if (formIsValid)
         event.preventDefault();

      const formData = {};
      for (let formElementId in orderForm) {
         formData[formElementId] = orderForm[formElementId].value;
      }

      const newOrder = {
         ingredients: props.ings,
         price: props.price,
         orderData: formData,
         userId: props.userId
      };

      props.onOrderBurger(newOrder, props.token);
   }


   const inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = { ...orderForm };
      const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      let formIsValid = true;
      for (let inputId in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputId].valid && formIsValid;
      }
      setOrderForm(updatedOrderForm);
      setFormIsValid(formIsValid);
   }

   const formElementsArray = [];
   for (let key in orderForm) {
      formElementsArray.push({
         id: key,
         config: orderForm[key]
      });
   }

   let form = (
      <form onSubmit={orderHandler}>
         {formElementsArray.map(element => (
            <Input
               key={element.id} elementType={element.config.elementType}
               onChange={(event) => inputChangedHandler(event, element.id)}
               elementConfig={element.config.elementConfig} value={element.config.value}
               invalid={!element.config.valid} shouldValidate={element.config.validation}
               touched={element.config.touched}
            />)
         )}
         <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
      </form>
   );

   if (props.loading) {
      form = <Spinner />;
   }
   return (
      <div className={classes.ContactData}>
         <h4>Enter your contact data</h4>
         {form}
      </div>
   );
}

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.orders.loading,
      token: state.auth.token,
      userId: state.auth.userId
   };
};

const mapDispatchToProps = dispatch => ({
   onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));