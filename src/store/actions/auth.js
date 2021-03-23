import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH, AUTH_INITIATE_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE } from './actionsTypes';

// Los comentarios es utilizando redux-thunk y sin comentarios es usando redux-saga

export const authStart = () => {
   return { type: AUTH_START };
};

export const authSuccess = (idToken, userId) => {
   return { type: AUTH_SUCCESS, idToken: idToken, userId: userId };
};

export const authFail = (error) => {
   return { type: AUTH_FAIL, error: error };
};

export const logOut = () => {
   // localStorage.removeItem('token');
   // localStorage.removeItem('expirationDate');
   // localStorage.removeItem('userId');
   return { type: AUTH_INITIATE_LOGOUT };
};

export const logoutSucceed = () => {
   return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
   // return dispatch => {
   //    setTimeout(() => {
   //       dispatch(logOut());
   //    }, expirationTime * 1000);
   // };
   return { type: AUTH_CHECK_TIMEOUT, expirationTime: expirationTime };
};

export const auth = (email, password, isSignup) => {
   // with redux-thunk
   // return dispatch => {
   //    dispatch(authStart());
   //    const authData = {
   //       email: email,
   //       password: password,
   //       returnSecureToken: true
   //    };
   //    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDME_DbaBDAWTijMPtAhSHEQPtvNY2r98k';
   //    if (!isSignup) {
   //       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDME_DbaBDAWTijMPtAhSHEQPtvNY2r98k'
   //    }
   //    axios.post(url, authData)
   //       .then(response => {
   //          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

   //          // localStorage almacena informacion en el navegador para ser utilizada despues de hacer reload
   //          localStorage.setItem('token', response.data.idToken);
   //          localStorage.setItem('expirationDate', expirationDate);
   //          localStorage.setItem('userId', response.data.localId);

   //          dispatch(authSuccess(response.data.idToken, response.data.localId));
   //          dispatch(checkAuthTimeout(response.data.expiresIn));
   //       })
   //       .catch(err => {
   //          let errorMsg = 'An error has ocurred, try again later.';
   //          const error = err.response.data.error.message;
   //          if (error.includes('EMAIL_EXISTS')) {
   //             errorMsg = 'Email already taken by another user, please use a different email to Sign Up.';
   //          }
   //          else if (error.includes('OPERATION_NOT_ALLOWED')) {
   //             errorMsg = 'Actually this projects is not allowing Sign Up operations.';
   //          }
   //          else if (error.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
   //             errorMsg = 'Please try again later';
   //          }
   //          else if (error.includes('EMAIL_NOT_FOUND')) {
   //             errorMsg = 'Invalid email or password.';
   //          }
   //          else if (error.includes('INVALID_PASSWORD')) {
   //             errorMsg = 'Invalid email or password.';
   //          }
   //          else if (error.includes('USER_DISABLED')) {
   //             errorMsg = 'User with this credentials is disabled.';
   //          }
   //          else if (error.includes('WEAK_PASSWORD')) {
   //             errorMsg = 'The password must be 6 character long at least.';
   //          }
   //          dispatch(authFail(errorMsg));
   //       })
   // };
   // with Saga
   return { type: AUTH_USER, email: email, password: password, isSignup: isSignup };
};

export const setAuthRedirectPath = (path) => {
   return {
      type: SET_AUTH_REDIRECT_PATH,
      path: path
   };
};

export const authCheckState = () => {
   // With redux-thunk
   // return dispatch => {
   //    const token = localStorage.getItem('token');
   //    if (!token) {
   //       dispatch(logOut());
   //    }
   //    else {
   //       const expirationDate = new Date(localStorage.getItem('expirationDate'));
   //       if (expirationDate <= new Date()) {
   //          dispatch(logOut());
   //       }
   //       else {
   //          const userId = localStorage.getItem('userId');
   //          dispatch(authSuccess(token, userId));
   //          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
   //       }
   //    }
   // };

   // with redux-saga
   return { type: AUTH_CHECK_STATE };
};