import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthSetatusService } from '../../auth-setatus.service';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from '../../servicio/users/user-service.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent {
  userId: number;
  nombreUsuario!: string;
  gameIds: number[] = [];
  games: any[] = [];

  constructor(private gameService: GameService, private route: ActivatedRoute,private userInfoService: UserService,private router: Router,private authStatusService: AuthSetatusService) {
    this.userId = 0; // Asignar un valor predeterminado
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'] as number; // Aserción de tipo
      if(this.authStatusService.getLoggedIn() !==this.userId.toString())
      {
        this.router.navigate(['/login']);
      }
      this.getCart();
      this.userInfoService.getinfous(this.userId.toString()).subscribe(
        (response: any) => {
          this.nombreUsuario = response.nombre_u;
        },
        (error: any) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    });
  }

  getCart(): void {
    this.gameService.getMygames(this.userId).subscribe(
      (response: any) => {
        if (response !== null) {
          this.gameIds = response.map((game: any) => game.gameId); // Obtener los gameId del carrito
          this.loadGames(); // Cargar los juegos correspondientes a los gameId
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadGames(): void {
    const gameRequests: Observable<any>[] = [];

    for (const id of this.gameIds) {
      gameRequests.push(this.gameService.getGame(id)); // Hacer una solicitud por cada gameId
    }

    forkJoin(gameRequests).subscribe(
      (data) => {
        this.games = data; // Asignar los juegos recuperados a la propiedad 'games'
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
