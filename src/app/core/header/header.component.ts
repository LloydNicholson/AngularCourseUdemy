import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromAuthActions from '../../auth/store/auth.actions';
import * as fromRecipeActions from '../../recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuth.State>;

  constructor(
      private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.authState$ = this.store.select('auth');

  }

  onSaveData() {
    this.store.dispatch(new fromRecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
