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
    password: new FormControl(''),
    nombre_u: new FormControl('', Validators.required),
    nombre_com: new FormControl('', Validators.required),
    Fecha_N: new FormControl('', Validators.required),
    ci: new FormControl('', Validators.required)
  });
  profilePic: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  profilePicOptions: string[] = [
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP1063-CUSA15534_00-AV00000000000005/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP4396-CUSA04289_00-AV00000000000009/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
    'https://image.api.playstation.com/cdn/UP4312/CUSA11327_00/Rzlb502W6Gs22lWIyOuqt8AEvF3O4LSi.png?w=440&thumb=false',
    'https://image.api.playstation.com/cdn/UP1024/CUSA04191_00/yTQp9ycrEcpToRR5rZaWfe0a1g94kA9u.png?w=440&thumb=false',
    'https://image.api.playstation.com/cdn/UP1023/CUSA07718_00/NttB60oN3WLqThv1xuCHTE7Ws0PoqCF9.png?w=440&thumb=false',
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  ];
  // Variables de estado
  isLoading = false;
  isSuccess = false;
  showLoginButton = false;

  constructor(private userService: UserService) {}

  changeProfilePic(option: string) {
    this.profilePic = option;
  }

  // Función para manejar el envío del formulario
  onSubmit() {
    this.isLoading = true;

    // Obtener los valores del formulario
    const email = this.miFormulario.value.email;
    const password = this.miFormulario.value.password;
    const { nombre_u, nombre_com, Fecha_N, ci } = this.miFormulario.value;

    // Verificar si se ha ingresado un correo electrónico
    if (email) {
      // Verificar si el correo electrónico ya está registrado
      this.userService.verifyEmail(email).subscribe(result => {
        if (result && result.exists) {
          alert('El email ya está registrado');
        } else {
          // Crear un objeto con los datos del usuario a registrar
          const pro = {
            'email': email,
            'password': password,
            'role': "user",
            "infoUser": {
              "profilePic":this.profilePic,
              "nombre_u": nombre_u,
              "nombre_com": nombre_com,
              "Fecha_N": Fecha_N,
              "ci": ci
            }
          };

          // Llamar al servicio para crear el usuario
          this.userService.createUser(pro).subscribe(data => {
            this.usuario.push(data);
            alert('Registrado con Éxito!!');
            window.location.href = '/login';

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
