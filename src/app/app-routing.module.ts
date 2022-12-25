import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { AddingDishComponent } from './adding-dish/adding-dish.component'
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';

const routes: Routes = [ 
  { path: 'menu', component: DishesComponent }, 
  { path: 'dodaj', component: AddingDishComponent },
  { path: 'koszyk', component: CartComponent },
  { path: 'produkt/:id', component: DishDetailsComponent },
  { path: '', component: HomeComponent } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
