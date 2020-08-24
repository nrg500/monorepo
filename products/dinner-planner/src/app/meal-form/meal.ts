import {Ingredient} from './ingredient/ingredient';

export class Meal {
  name: string;
  ingredients: Ingredient[];

  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name;
    this.ingredients = ingredients;
  }
}
