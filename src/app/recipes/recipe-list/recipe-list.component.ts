import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipes.reducer';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState$: Observable<fromRecipe.State>;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private store: Store<fromRecipe.RecipeState>
  ) {
  }

  ngOnInit() {
    this.recipesState$ = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
