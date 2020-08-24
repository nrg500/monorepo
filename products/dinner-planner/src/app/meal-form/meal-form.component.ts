import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ingredient } from './ingredient/ingredient';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IngredientService } from './ingredient/ingredient.service';
import {Meal} from './meal';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  units = ['gr', 'pc', 'cl', 'ml', 'l', 'kg'];

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  mealForm = new FormGroup({
    name : new FormControl(''),
    ingredients: new FormArray([
      this.createRow(),
      this.createRow(),
      this.createRow(),
      this.createRow()
    ])
  });

  ingredients = [];

  constructor(private ingredientService: IngredientService, private http: HttpClient) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(resp => {
      this.ingredients = resp.body
    });
  }

  resetMealForm(): void {
    this.mealForm = new FormGroup({
      name : new FormControl(''),
      ingredients: new FormArray([
        this.createRow(),
        this.createRow(),
        this.createRow(),
        this.createRow()
      ])
    });
  }

  onSubmit(): void {
    const ingredients = [];
    for (const ingredientControl of this.ingredientsFormArray.controls) {
      const ingredient = ingredientControl.value as Ingredient;
      if (ingredient.name) {
        ingredients.push(ingredient);
      }
    }
    const mealName = this.mealForm.get('name').value;
    if (mealName && ingredients.length > 0) {
      const meal = new Meal(mealName, ingredients);
      const httpOptions = {
        headers: this.headers
      };
      this.http.post(environment.mealsServiceUrl, meal, httpOptions)
        .subscribe(postedMeal => { console.log(postedMeal); this.resetMealForm(); }, error => console.log(error));
    }
  }

  get ingredientsFormArray(): FormArray {
    return this.mealForm.get('ingredients') as FormArray;
  }

  addRow(): void {
    this.ingredientsFormArray.push(this.createRow());
  }

  deleteRow(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }

  createRow(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
      unit: new FormControl('gr')
    });
  }

  putIngredientInForm(ingredient: Ingredient) : void {
    const ingredientFormArray : FormArray = this.mealForm.get('ingredients') as FormArray
    let foundPristineGroup = false;
    let firstGroup = this.createRow();
    for(let ingredientFormGroup of ingredientFormArray.controls) {
      if(ingredientFormGroup.pristine) {
        firstGroup = ingredientFormGroup as FormGroup;
        foundPristineGroup = true;
        break;
      }
    }
    if(!foundPristineGroup) {
      ingredientFormArray.controls.push(firstGroup);
    }
    firstGroup.markAsDirty();
    firstGroup.setValue(ingredient);
  }
}
