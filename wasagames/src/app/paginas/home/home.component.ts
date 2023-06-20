import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';
import { UserService } from '../../servicio/users/user-service.service';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: any[] = [];
  userId?: string;
  nombreUsuario!: string;
  profilePic!: string;
  constructor(private userService: GameService,private userInfoService: UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadGames();

    // Obtener el ID del usuario de la URL
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Obten el ID del usuario de la URL
      console.log('id:',this.userId);
      if (this.userId) { // Verifica si el ID del usuario tiene un valor asignado
        this.userInfoService.getinfous(this.userId).subscribe(
          (response: any) => {
            this.nombreUsuario = response.nombre_u;
            this.profilePic = response.profilePic;
          },
          (error: any) => {
            console.error('Error al obtener la información del usuario:', error);
          }
        );
      }
    });
  }


  loadGames() {
    const gameIds = [7, 3, 10, 8];
    const gameRequests: Observable<any>[] = [];

    for (const id of gameIds) {
      gameRequests.push(this.userService.getGame(id));
    }

    forkJoin(gameRequests).subscribe(
      (data) => {
        this.games = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
