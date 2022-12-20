import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddingDishComponent } from './adding-dish/adding-dish.component'
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { FilteringComponent } from './filtering/filtering.component';
import { FilterNamePipe } from './Pipes/filter-name.pipe';
import { FilterOriginPipe } from './Pipes/filter-origin.pipe';
import { FilterTypePipe } from './Pipes/filter-type.pipe';
import { FilterIngridientsPipe } from './Pipes/filter-ingridients.pipe';
import { FilterPricePipe } from './Pipes/filter-price.pipe';
import { FilterRatingPipe } from './Pipes/filter-rating.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishComponent,
    AddingDishComponent,
    RatingComponent,
    FilteringComponent,
    FilterNamePipe,
    FilterOriginPipe,
    FilterTypePipe,
    FilterIngridientsPipe,
    FilterPricePipe,
    FilterRatingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
