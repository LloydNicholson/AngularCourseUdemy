import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState$: Observable<{ ingredients: Ingredient[] }>;

  constructor(
      private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.shoppingListState$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new fromShoppingListActions.StartEdit(index));
  }
}
