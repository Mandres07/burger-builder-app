import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, SET_ERROR, SET_INGREDIENTS_INITIATE } from './actionsTypes';

export const addIngredient = (name) => {
   return {
      type: ADD_INGREDIENT,
      ingredientName: name
   };
};

export const removeIngredient = (name) => {
   return {
      type: REMOVE_INGREDIENT,
      ingredientName: name
   };
};

export const setIngredients = (ingredients) => {
   return {
      type: SET_INGREDIENTS,
      ingredients: ingredients
   };
};



export const setError = () => {
   return {
      type: SET_ERROR
   };
};

export const initIngredients = () => {
   // with redux-thunk
   // return dispatch => {
   //    axios.get('ingredients.json')
   //       .then(response => {
   //          dispatch(setIngredients(response.data));
   //       })
   //       .catch(err => {
   //          dispatch(setError());
   //       });
   // };

   // with redux-saga
   return { type: SET_INGREDIENTS_INITIATE };
};