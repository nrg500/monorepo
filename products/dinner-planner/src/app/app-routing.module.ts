import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealFormComponent } from './meal-form/meal-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addMeal', component: MealFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
