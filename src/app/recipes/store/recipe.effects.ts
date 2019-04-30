import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

import * as fromRecipeActions from './recipe.actions';
import * as fromRecipe from './recipes.reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
  .pipe(
      ofType(fromRecipeActions.FETCH_RECIPES),
      switchMap((action: fromRecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>(
            'https://ng-recipe-book-1436d.firebaseio.com/recipes.json',
            {
              observe: 'body',
              responseType: 'json'
            }
        );
      }),
      map(recipes => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: fromRecipeActions.SET_RECIPES,
          payload: recipes
        };
      })
  );
  @Effect({ dispatch: false })
  recipeStore = this.actions$
  .pipe(
      ofType(fromRecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest(
            'PUT',
            'https://ng-recipe-book-1436d.firebaseio.com/recipes.json',
            state.recipes,
            { reportProgress: true }
        );
        return this.httpClient.request(req);
      })
  );

  constructor(
      private actions$: Actions,
      private httpClient: HttpClient,
      private store: Store<fromRecipe.RecipeState>
  ) {
  }
}
