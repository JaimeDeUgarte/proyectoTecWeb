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
        if (this.datosUser && this.datosUser.role) {
          const userRole = this.datosUser.role; // Obtener el rol del usuario
          const userid = this.datosUser.id; // Obtener el ID del usuario

          if (userRole === 'admin') {
            this.router.navigate(['/admin']); // Redirigir a la página de administrador
          } else {
            // Obtener información adicional del usuario
            this.userService.getinfous(userid).subscribe(
              response => {
                console.log('Response:', response);

                if (response.userID === userid) {
                  // Los datos del usuario existen, mostrar la barra de navegación y las páginas correspondientes
                  console.log('Datos del usuario encontrados');
                  this.router.navigate(['/user', userid, "home", userid]); // Redirigir a la página de usuario con el ID del usuario
                } else {
                  // Los datos del usuario no existen, redirigir a la página CreateDatosUsuarioComponent
                  console.log('Datos del usuario no encontrados. Redireccionando...');
                  this.router.navigate(['/user', userid, 'cdata']);
                }
              },
              error => {
                console.log('Error:', error);
                // Manejar el error
              }
            );
          }
        } else {
          alert('Contraseña incorrecta o usuario no registrado. Si no estás registrado, regístrate.');
        }
      },
      (error) => {
        alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
      }
    );
  }
}
