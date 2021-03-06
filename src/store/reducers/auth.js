import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
   authRedirectPath: '/'
};

const authStart = (state, action) => {
   return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
   return updateObject(state, {
      error: null,
      loading: false,
      token: action.idToken,
      userId: action.userId
   });
};

const authFail = (state, action) => {
   return updateObject(state, {
      error: action.error,
      loading: false
   });
};

const authLogOut = (state, action) => {
   return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
   return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case AUTH_START:
         return authStart(state, action);
      case AUTH_SUCCESS:
         return authSuccess(state, action);
      case AUTH_FAIL:
         return authFail(state, action);
      case AUTH_LOGOUT:
         return authLogOut(state, action);
      case SET_AUTH_REDIRECT_PATH:
         return setAuthRedirectPath(state, action);
      default:
         return state;
   }
}

export default reducer;