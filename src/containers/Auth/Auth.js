import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
   const [authForm, setAuthForm] = useState({
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
   });

   const [isSignup, setIsSignup] = useState(true);

   const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

   useEffect(() => {
      if (!buildingBurger && authRedirectPath !== '/') {
         onSetAuthRedirectPath();
      }
   }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

   const inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...authForm,
         [controlName]: {
            ...authForm[controlName],
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[controlName].validation),
            touched: true
         }
      };
      setAuthForm(updatedControls);
   };

   const submitHandler = (event) => {
      event.preventDefault();
      props.onAuth(authForm.email.value, authForm.password.value, isSignup);
   };

   const switchAuthModeHandler = () => {
      setIsSignup(prevState => !prevState);
   };

   if (props.isAuthenticated) {
      return <Redirect to={props.authRedirectPath} />;
   }

   const formElementsArray = [];
   for (let key in authForm) {
      formElementsArray.push({
         id: key,
         config: authForm[key]
      });
   }

   let form = formElementsArray.map(element => (
      <Input key={element.id} elementType={element.config.elementType} autoComplete={false}
         onChange={(event) => inputChangedHandler(event, element.id)}
         elementConfig={element.config.elementConfig} value={element.config.value}
         invalid={!element.config.valid} shouldValidate={element.config.validation}
         touched={element.config.touched} />
   ));

   if (props.loading) {
      form = <Spinner />;
   }

   const errorMessage = props.error ? (<p>{props.error}</p>) : null;

   return (
      <div className={classes.Auth}>
         {errorMessage}
         <form onSubmit={submitHandler}>
            {form}
            <Button btnType="Success">{isSignup ? 'REGISTER' : 'SIGN IN'}</Button>
         </form>
         <Button click={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGN IN' : 'REGISTER'}</Button>
      </div>
   );
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