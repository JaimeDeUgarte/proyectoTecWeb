import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../servicio/users/user-service.service';
import { Router } from '@angular/router';
import { AuthSetatusService } from '../../auth-setatus.service';

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

  constructor(private userService: UserService, private router: Router,private authStatusService: AuthSetatusService) {}

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.loginUser(email, password).subscribe(
      (response: any) => {
        const token = response.token;
        const tokenPayload = token.split('.')[1]; // Obtener la parte del payload del token
        const payload = JSON.parse(atob(tokenPayload)); // Decodificar y parsear el payload
        const id = payload.id;

        console.log(id);
        if (id) {
          // Verificar si el usuario tiene un carrito existente
          this.userService.getCart(id).subscribe(
            (cartResponse: any) => {
              if (cartResponse) {
                this.authStatusService.setLoggedIn(id.toString());
                this.router.navigate(['/user', id, 'home',id]);
              } else {
                // Crear un nuevo carrito
                const cartData = {
                  userId: id
                };

                this.userService.createCart(cartData).subscribe(
                  (createCartResponse: any) => {
                    // Actualizar la información del usuario con el carritoId
                    const userData = {
                      carritoId: id
                    };

                    this.userService.updateUserInfo(id, userData).subscribe(
                      (updateUserResponse: any) => {
                        this.authStatusService.setLoggedIn(id.toString());
                        this.router.navigate(['/user', id, 'home',id]);
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
