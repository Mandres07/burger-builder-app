import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Email'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignup: true
   }

   componentDidMount() {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
         this.props.onSetAuthRedirectPath();
      }
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
         }
      };
      this.setState({ controls: updatedControls });
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return { isSignup: !prevState.isSignup };
      });
   }

   render() {
      if (this.props.isAuthenticated) {
         return <Redirect to={this.props.authRedirectPath} />;
      }

      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         });
      }

      let form = formElementsArray.map(element => (
         <Input key={element.id} elementType={element.config.elementType} autoComplete={false}
            onChange={(event) => this.inputChangedHandler(event, element.id)}
            elementConfig={element.config.elementConfig} value={element.config.value}
            invalid={!element.config.valid} shouldValidate={element.config.validation}
            touched={element.config.touched} />
      ));

      if (this.props.loading) {
         form = <Spinner />;
      }

      const errorMessage = this.props.error ? (<p>{this.props.error}</p>) : null;

      return (
         <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
               {form}
               <Button btnType="Success">{this.state.isSignup ? 'REGISTER' : 'SIGN IN'}</Button>
            </form>
            <Button click={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'REGISTER'}</Button>
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
      onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
   };
};

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      buildingBurger: state.burgerBuilder.building,
      authRedirectPath: state.auth.authRedirectPath
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);