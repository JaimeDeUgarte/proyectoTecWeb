import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  userId: number;
  gameIds: number[] = [];
  games: any[] = [];

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.userId = 0; // Asignar un valor predeterminado
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'] as number; // Aserción de tipo
      console.log('userId:', this.userId);
      this.getCart();
    });
  }

  getCart(): void {
    this.gameService.getCart(this.userId).subscribe(
      (response: any) => {
        this.gameIds = response.map((game: any) => game.gameId); // Obtener los gameId del carrito
        this.loadGames(); // Cargar los juegos correspondientes a los gameId
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
