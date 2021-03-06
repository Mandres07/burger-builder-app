import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {

   state = {
      orderForm: {
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
      },
      formIsValid: false,
      loading: false
   }

   orderHandler = (event) => {
      if (this.state.formIsValid)
         event.preventDefault();
      // this.setState({ loading: true });

      const formData = {};
      for (let formElementId in this.state.orderForm) {
         formData[formElementId] = this.state.orderForm[formElementId].value;
      }

      const newOrder = {
         ingredients: this.props.ings,
         price: this.props.price,
         orderData: formData,
         userId: this.props.userId
      };

      this.props.onOrderBurger(newOrder, this.props.token);
   }


   inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = { ...this.state.orderForm };
      const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      let formIsValid = true;
      for (let inputId in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputId].valid && formIsValid;
      }
      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
   }

   render() {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
         });
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map(element => (
               <Input
                  key={element.id} elementType={element.config.elementType}
                  onChange={(event) => this.inputChangedHandler(event, element.id)}
                  elementConfig={element.config.elementConfig} value={element.config.value}
                  invalid={!element.config.valid} shouldValidate={element.config.validation}
                  touched={element.config.touched}
               />)
            )}
            <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
         </form>
      );

      if (this.props.loading) {
         form = <Spinner />;
      }
      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
         </div>
      );
   }
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