import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions/index';

// Lazy loading
const Checkout = React.lazy(() => {
   return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
   return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
   return import('./containers/Auth/Auth');
});

const App = (props) => {
   const { onTryAutoSignUp } = props;

   useEffect(() => {
      onTryAutoSignUp();
   }, [onTryAutoSignUp]);

   let routes = (
      <Switch>
         <Route path='/auth' render={props => <Auth {...props} />} />
         <Route path='/' exact component={BurgerBuilder} />
         <Redirect to='/' />
      </Switch>
   );

   if (props.isAuth) {
      routes = (
         <Switch>
            <Route path='/checkout' render={props => <Checkout {...props} />} />
            <Route path='/orders' render={props => <Orders {...props} />} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' render={props => <Auth {...props} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
         </Switch>
      );
   }

   return (
      <Layout>
         <Suspense fallback={<p>Loading...</p>}>
            {routes}
         </Suspense>
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
