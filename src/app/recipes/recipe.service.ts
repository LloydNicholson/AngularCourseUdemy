import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [
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
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next([...this._recipes]);
  }

  getRecipes(): Recipe[] {
    return [...this._recipes];
  }

  getRecipe(index: number) {
    return this._recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next([...this._recipes]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
    this.recipesChanged.next([...this._recipes]);
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next([...this._recipes]);
  }
}
