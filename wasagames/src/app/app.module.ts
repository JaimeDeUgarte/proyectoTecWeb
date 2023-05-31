import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importa el ReactiveFormsModule aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { SignupComponent } from './paginas/signup/signup.component';
import { HomeComponent } from './paginas/home/home.component';
import { HadminComponent } from './paginas/hadmin/hadmin.component';
import { CreateGamesComponent } from './paginas/create-games/create-games.component';
import { UserGamesComponent } from './paginas/user-games/user-games.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { DisplayUserComponent } from './paginas/display-user/display-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HadminComponent,
    CreateGamesComponent,
    UserGamesComponent,
    CarritoComponent,
    DisplayUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule // Agrega el ReactiveFormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
