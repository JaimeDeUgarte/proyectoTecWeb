import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { SignupComponent } from './paginas/signup/signup.component';
import { HomeComponent } from './paginas/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el LoginComponent
  { path: 'signup', component: SignupComponent }, // Ruta para el SignupComponent
  { path: 'home', component: HomeComponent }, // Ruta para el HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
