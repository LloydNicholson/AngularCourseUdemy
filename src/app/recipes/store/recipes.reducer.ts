import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromRecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

export interface RecipeState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: [
    new Recipe('Lasagne',
        'Meaty goodness',
        'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/mary_berrys_lasagne_al_16923_16x9.jpg',
        [
          new Ingredient('Meat', 100),
          new Ingredient('Pasta layers', 10),
          new Ingredient('Carrots', 3),
          new Ingredient('Cheese', 20)
        ]),
    new Recipe('Pasta Salad',
        'Lettuce, lettuce and more lettuce',
        'https://ohsweetbasil.com/wp-content/uploads' +
        '/Greek-Pasta-Salad-Oh-Sweet-Basil-2.jpg',
        [
          new Ingredient('Pasta', 50),
          new Ingredient('Meat', 1),
          new Ingredient('Cucumber', 1),
          new Ingredient('Feta', 50)
        ])
  ]
};

export function recipeReducer(state = initialState, action: fromRecipeActions.RecipeActions) {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case fromRecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes]; // immutable copy
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case fromRecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
