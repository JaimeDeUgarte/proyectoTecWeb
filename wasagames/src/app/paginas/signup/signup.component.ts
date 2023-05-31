import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UserService } from '../../servicio/users/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Arreglo para almacenar los usuarios
  usuario: any[] = [];

  // Formulario de registro
  miFormulario = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  // Variables de estado
  isLoading = false;
  isSuccess = false;
  showLoginButton = false;

  constructor(private userService: UserService) {}

  // Función para manejar el envío del formulario
  onSubmit() {
    this.isLoading = true;

    // Obtener los valores del formulario
    const email = this.miFormulario.value.email;
    const password = this.miFormulario.value.password;

    // Verificar si se ha ingresado un correo electrónico
    if (email) {
      // Verificar si el correo electrónico ya está registrado
      this.userService.verifyEmail(email).subscribe(result => {
        if (result.exists) {
          alert('El email ya está registrado');
        } else {
          // Crear un objeto con los datos del usuario a registrar
          const pro = {
            'email': email,
            'password': password,
            'role': "user"
          };

          // Llamar al servicio para crear el usuario
          this.userService.createUser(pro).subscribe(data => {
            this.usuario.push(data);

            // Simular un retardo de 10 segundos para mostrar el estado de éxito y el botón de inicio de sesión
            setTimeout(() => {
              this.isLoading = false;
              this.isSuccess = true;
              this.showLoginButton = true; // Mostrar el botón
            }, 10000);
          });
        }
      });
    }
  }
}
