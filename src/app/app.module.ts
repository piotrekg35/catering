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
import { ToCapitalPipe } from './Pipes/to-capital.pipe';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CommentComponent } from './comment/comment.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationPipe } from './Pipes/pagination.pipe';
import { CurrencyPipe } from './Pipes/currency.pipe';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { PersistenceComponent } from './persistence/persistence.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserElementComponent } from './user-element/user-element.component';

const environment = {
  firebase:{
  apiKey: "AIzaSyAPT0oI3tanDZOLqBM5LUWUZM6xqnnwolg",
  authDomain: "restaurantabc.firebaseapp.com",
  projectId: "restaurantabc",
  storageBucket: "restaurantabc.appspot.com",
  messagingSenderId: "1020683998852",
  appId: "1:1020683998852:web:7fdba5059026303e3514d1",
  databaseURL: "https://restaurantabc-default-rtdb.europe-west1.firebasedatabase.app"
}
};


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
    FilterRatingPipe,
    ToCapitalPipe,
    HomeComponent,
    CartComponent,
    DishDetailsComponent,
    CommentComponent,
    PaginationComponent,
    PaginationPipe,
    CurrencyPipe,
    RegisterComponent,
    LogInComponent,
    AdminViewComponent,
    PersistenceComponent,
    UserManagementComponent,
    UserElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
