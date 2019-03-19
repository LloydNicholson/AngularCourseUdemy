import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    // return this.httpClient.put(
    //   'https://ng-recipe-book-1436d.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token) // able to add query params using set method
    //     // headers: new HttpHeaders().set('Authorisation', 'Token')
    //   }
    // );
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-1436d.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true }
    );
    return this.httpClient.request(req);
  }

  fetchRecipes() {
    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-1436d.firebaseio.com/recipes.json',
        {
          observe: 'body'
        }
      )
      .pipe(
        map(recipes => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
