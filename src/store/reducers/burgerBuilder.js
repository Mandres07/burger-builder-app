import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_ERROR, SET_INGREDIENTS } from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
   ingredients: null,
   totalPrice: 4,
   error: false,
   building: false
};

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

const addIngredient = (state, action) => {
   const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
   const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
   const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true
   }
   return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
   // return {
   //    ...state,
   //    ingredients: {
   //       ...state.ingredients,
   //       [action.ingredientName]: state.ingredients[action.ingredientName] - 1
   //    },
   //    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
   // };
   const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
   const updatedIngs = updateObject(state.ingredients, updatedIng);
   const updatedSt = {
      ingredients: updatedIngs,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      building: true
   }
   return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
   return updateObject(state, {
      ingredients: {
         salad: action.ingredients.salad,
         bacon: action.ingredients.bacon,
         cheese: action.ingredients.cheese,
         meat: action.ingredients.meat
      },
      totalPrice: 4,
      error: false,
      building: false
   });
};

const setError = (state, action) => {
   // return {
   //    ...state,
   //    error: true
   // };
   return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_INGREDIENT:
         return addIngredient(state, action);
      case REMOVE_INGREDIENT:
         return removeIngredient(state, action);
      case SET_INGREDIENTS:
         return setIngredients(state, action);
      case SET_ERROR:
         return setError(state, action);
      default:
         return state;
   }
}

export default reducer;