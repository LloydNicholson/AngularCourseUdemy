import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Lasagne', 'Meaty goodness', 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/mary_berrys_lasagne_al_16923_16x9.jpg'),
    new Recipe('Pasta Salad', 'Lettuce, lettuce and more lettuce', 'https://ohsweetbasil.com/wp-content/uploads' +
      '/Greek-Pasta-Salad-Oh-Sweet-Basil-2.jpg')
  ];

  constructor() {

  }

  ngOnInit() {
  }

}
