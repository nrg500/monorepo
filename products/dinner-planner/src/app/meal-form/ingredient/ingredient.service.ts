import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getIngredients() : Observable<HttpResponse<Ingredient[]>> {
    return this.http.get<Ingredient[]>(environment.ingredientsServiceUrl, { observe: 'response' });
  }
}
