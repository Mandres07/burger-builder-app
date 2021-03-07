import React, { useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

const App = (props) => {

   useEffect(() => {
      props.onTryAutoSignUp();
   }, []);

   let routes = (
      <Switch>
         <Route path='/auth' component={Auth} />
         <Route path='/' exact component={BurgerBuilder} />
         <Redirect to='/' />
      </Switch>
   );

   if (props.isAuth) {
      routes = (
         <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
         </Switch>
      );
   }

   return (
      <Layout>
         {routes}
      </Layout>
   );
}

const mapDispatchToProps = dispatch => {
   return {
      onTryAutoSignUp: () => dispatch(authCheckState())
   };
};

const mapStateToProps = state => {
   return {
      isAuth: state.auth.token !== null
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
