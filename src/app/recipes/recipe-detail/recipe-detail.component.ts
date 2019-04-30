import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as fromShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipes.reducer';
import * as fromRecipeActions from '../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState$: Observable<fromRecipe.RecipeState>;
  id: number;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState$ = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new fromShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });

  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
