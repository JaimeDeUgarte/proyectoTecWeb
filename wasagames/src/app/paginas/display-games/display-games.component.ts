import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthSetatusService } from '../../auth-setatus.service';

@Component({
  selector: 'app-display-games',
  templateUrl: './display-games.component.html',
  styleUrls: ['./display-games.component.css']
})
export class DisplayGamesComponent implements OnInit {

  games: any[] = [];
  userId: string | null = null;

  constructor(private gameService: GameService, private route: ActivatedRoute,private router: Router,private authStatusService: AuthSetatusService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if(this.authStatusService.getLoggedIn() !==this.userId)
      {
        this.router.navigate(['/login']);
      }
      console.log('userId:', this.userId);
      this.getGames();
    });
  }

  getGames(): void {
    this.gameService.getGames().subscribe(
      (response: any) => {
        this.games = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  comprarJuego(gameId: string): void {
    console.log('gameId:', gameId);

    const cartItem = {
      carritoId: this.userId,
      gameId: gameId
    };

    this.gameService.addGames(cartItem).subscribe(
      (response: any) => {
        console.log('Juego agregado al carrito:', response);
        alert('En el carrito!');
        window.location.reload();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


}
