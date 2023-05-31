import { Component } from '@angular/core';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
  userId: string = '1'; // Aquí asigna el valor correspondiente al ID del usuario
}
