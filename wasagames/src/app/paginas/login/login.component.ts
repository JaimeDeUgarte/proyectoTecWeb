import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../servicio/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  datosUser: any; // Variable para almacenar los datos del usuario
  userinfo: any[] = []; // Arreglo para almacenar la información del usuario
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''), // Campo de formulario para el email
    password: new FormControl('') // Campo de formulario para la contraseña
  });

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const email = this.loginForm.get('email')?.value; // Obtener el valor del campo de email
    const password = this.loginForm.get('password')?.value; // Obtener el valor del campo de contraseña

    // Llamar al método del servicio para obtener el usuario
    this.userService.getUser(email, password).subscribe(
      (response: any) => {
        this.datosUser = response; // Asignar los datos del usuario obtenidos de la respuesta
        console.log(this.datosUser);

        // Verificar si se obtuvo un usuario válido
        if (this.datosUser ) {
          this.router.navigate(['/user', this.datosUser.id,'/home']);
        }
      },
      (error) => {
        alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
      }
    );
  }
}
