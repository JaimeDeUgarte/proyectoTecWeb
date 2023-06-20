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

  comprar(): void {
    const userData = {
      carritoId: this.userId,
      compra: true
    };

    this.gameService.updateGameInfo(userData).subscribe(
      (response: any) => {
        // Realiza las acciones necesarias en caso de éxito
        console.log('Compra realizada:', response);
        alert('Tu compra fue realizada!');
        window.location.reload();
      },
      (error: any) => {
        console.error('Error al realizar la compra:', error);
      }
    );
  }
  eliminarJuego(gameId: number): void {
    if (this.userId !== null) {
      const carritoId = this.userId;

      this.gameService.deleteGame(carritoId.toString(), gameId.toString()).subscribe(
        (response: any) => {
          // Realiza las acciones necesarias en caso de éxito
          console.log('Juego eliminado del carrito:', response);
          alert('Juego Removido del carrito');
          window.location.reload();
          // Actualizar la lista de juegos eliminando el juego correspondiente
          this.games = this.games.filter((game: any) => game.gameId !== gameId);
        },
        (error: any) => {
          console.error('Error al eliminar el juego del carrito:', error);
        }
      );
    } else {
      console.error('carritoId es null');
    }
  }

}
