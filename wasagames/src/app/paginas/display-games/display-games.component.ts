import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';

@Component({
  selector: 'app-display-games',
  templateUrl: './display-games.component.html',
  styleUrls: ['./display-games.component.css']
})
export class DisplayGamesComponent implements OnInit {

  games: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
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
}
