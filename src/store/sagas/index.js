import { takeEvery } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authChekStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import { AUTH_INITIATE_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE, SET_INGREDIENTS_INITIATE, PURCHASE_BURGER_INIT, FETCH_ORDERS_INIT } from '../actions/actionsTypes';

export function* watchAuth() {
   yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
   yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
   yield takeEvery(AUTH_USER, authUserSaga);
   yield takeEvery(AUTH_CHECK_STATE, authChekStateSaga);
}

export function* watchBurgerBuilder() {
   yield takeEvery(SET_INGREDIENTS_INITIATE, initIngredientsSaga);
}

export function* watchOrder() {
   yield takeEvery(PURCHASE_BURGER_INIT, purchaseBurgerSaga);
   yield takeEvery(FETCH_ORDERS_INIT, fetchOrdersSaga);
}