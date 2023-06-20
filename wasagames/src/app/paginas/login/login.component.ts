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
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.loginUser(email, password).subscribe(
      (response: any) => {
        this.datosUser = response.user;
        const token = response.token;

        console.log(this.datosUser);

        if (this.datosUser) {
          // Verificar si el usuario tiene un carrito existente
          this.userService.getCart(this.datosUser.id).subscribe(
            (cartResponse: any) => {
              if (cartResponse) {
                this.router.navigate(['/user', this.datosUser.id, 'home',this.datosUser.id]);
              } else {
                // Crear un nuevo carrito
                const cartData = {
                  userId: this.datosUser.id
                };

                this.userService.createCart(cartData).subscribe(
                  (createCartResponse: any) => {
                    // Actualizar la información del usuario con el carritoId
                    const userData = {
                      carritoId: this.datosUser.id
                    };

                    this.userService.updateUserInfo(this.datosUser.id, userData).subscribe(
                      (updateUserResponse: any) => {
                        this.router.navigate(['/user', this.datosUser.id, 'home']);
                      },
                      (updateUserError: any) => {
                        console.error(updateUserError);
                      }
                    );
                  },
                  (createCartError: any) => {
                    console.error(createCartError);
                  }
                );
              }
            },
            (cartError: any) => {
              console.error(cartError);
            }
          );
        }
      },
      (error) => {
        alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
      }
    );
  }
}
