import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { SignupComponent } from './paginas/signup/signup.component';
import { HomeComponent } from './paginas/home/home.component';
import {DisplayUserComponent} from './paginas/display-user/display-user.component'
import{DisplayGamesComponent}from './paginas/display-games/display-games.component'
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
        path: 'games',
        component: DisplayGamesComponent
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
