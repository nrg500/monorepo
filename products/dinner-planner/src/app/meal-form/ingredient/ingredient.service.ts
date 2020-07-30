import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }

  getIngredients() : Ingredient[] {
    return [
      new Ingredient('Aardappelen', 500, 'gr', '../../assets/ingredients/potatoes.jpg'),
      new Ingredient('Aardappelen', 1, 'kg', '../../assets/ingredients/potatoes.jpg'),
      new Ingredient('Aardappelen', 2, 'kg', '../../assets/ingredients/potatoes.jpg'),
      new Ingredient('Appels', 500, 'gr', '../../assets/ingredients/apples.jpg'),
      new Ingredient('Sperziebonen', 400, 'gr', '../../assets/ingredients/green-beans.jpg'),
      new Ingredient('Sperziebonen', 800, 'gr', '../../assets/ingredients/green-beans.jpg'),
      new Ingredient('Peren', 500, 'gr', '../../assets/ingredients/pears.jpg')
    ]
  }
}
