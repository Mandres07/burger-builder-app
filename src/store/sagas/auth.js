import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

// function* significa que es un generator
export function* logoutSaga(action) {
   // yield significa que hay que esperar que cada una de esas sentencias con yield deben terminar de ejecutarse para poder pasar a la siguiente
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');
   yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime * 1000);
   yield put(actions.logOut());
}

export function* authUserSaga(action) {
   yield put(actions.authStart())
   const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
   };
   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDME_DbaBDAWTijMPtAhSHEQPtvNY2r98k';
   if (!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDME_DbaBDAWTijMPtAhSHEQPtvNY2r98k'
   }
   try {
      const response = yield axios.post(url, authData)

      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      // localStorage almacena informacion en el navegador para ser utilizada despues de hacer reload
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);

      yield put(actions.authSuccess(response.data.idToken, response.data.localId))
      yield put(actions.checkAuthTimeout(response.data.expiresIn));
   }
   catch (err) {
      let errorMsg = 'An error has ocurred, try again later.';
      const error = err.response.data.error.message;
      if (error.includes('EMAIL_EXISTS')) {
         errorMsg = 'Email already taken by another user, please use a different email to Sign Up.';
      }
      else if (error.includes('OPERATION_NOT_ALLOWED')) {
         errorMsg = 'Actually this projects is not allowing Sign Up operations.';
      }
      else if (error.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
         errorMsg = 'Please try again later';
      }
      else if (error.includes('EMAIL_NOT_FOUND')) {
         errorMsg = 'Invalid email or password.';
      }
      else if (error.includes('INVALID_PASSWORD')) {
         errorMsg = 'Invalid email or password.';
      }
      else if (error.includes('USER_DISABLED')) {
         errorMsg = 'User with this credentials is disabled.';
      }
      else if (error.includes('WEAK_PASSWORD')) {
         errorMsg = 'The password must be 6 character long at least.';
      }
      yield put(actions.authFail(errorMsg));
   }
}

export function* authChekStateSaga(action) {
   const token = localStorage.getItem('token');
   if (!token) {
      yield put(actions.logOut());
   }
   else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
         yield put(actions.logOut());
      }
      else {
         const userId = localStorage.getItem('userId');
         yield put(actions.authSuccess(token, userId));
         yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
   }
}