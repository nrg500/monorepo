import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ingredient } from './ingredient/ingredient';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IngredientService } from './ingredient/ingredient.service';
import {Meal} from './meal';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  units = ['gr', 'cl', 'ml', 'l', 'kg'];

  mealForm = new FormGroup({
    name : new FormControl(''),
    ingredients: new FormArray([
      this.createRow(),
      this.createRow(),
      this.createRow(),
      this.createRow(),
      this.createRow()
    ])
  });

  constructor(private ingredientService: IngredientService, private http: HttpClient) { }

  ngOnInit(): void {
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
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(environment.mealsServiceUrl + '/meals', meal, httpOptions)
        .subscribe(postedMeal => console.log(postedMeal), error => console.log(error));
    }
  }

  get ingredientsFormArray(): FormArray {
    return this.mealForm.get('ingredients') as FormArray;
  }

  get ingredients(): Ingredient[] {
    return this.ingredientService.getIngredients();
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
}
