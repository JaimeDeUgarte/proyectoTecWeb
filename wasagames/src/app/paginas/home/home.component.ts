import { Component, OnInit } from '@angular/core';
import { GameService } from '../../servicio/games/games-service.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: any[] = [];

  constructor(private userService: GameService) { }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    const gameIds = [7, 5, 10, 8];
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
