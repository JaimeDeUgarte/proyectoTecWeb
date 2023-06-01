import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { SignupComponent } from './paginas/signup/signup.component';
import { HomeComponent } from './paginas/home/home.component';
import {DisplayUserComponent} from './paginas/display-user/display-user.component'
import{DisplayGamesComponent}from './paginas/display-games/display-games.component'
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { UserGamesComponent } from './paginas/user-games/user-games.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el LoginComponent
  { path: 'signup', component: SignupComponent }, // Ruta para el SignupComponent
  {
    path: 'user/:id',
    component: DisplayUserComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'games/:id',
        component: DisplayGamesComponent,
        pathMatch: 'full' // Agrega esta línea

      },
      {
        path: 'Mycart/:id',
        component: CarritoComponent,
        pathMatch: 'full' // Agrega esta línea

      },
      {
        path: 'Mygames/:id',
        component: UserGamesComponent,
        pathMatch: 'full' // Agrega esta línea

      }
    ]
  },
  { path: '', redirectTo: 'user/default-id/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/default-id/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
