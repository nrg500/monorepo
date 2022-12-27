import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { GameService } from './game.service';
import { GameState } from './gamestate';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {

  GameState = GameState;
  currentState?: GameState;
  gameStateSubscription: Subscription;

  constructor(private gameService: GameService) {
    this.currentState = this.gameService.currentState;
    this.gameStateSubscription = this.gameService.stateChangedEmitter.subscribe(value => {
      this.currentState = value;
    });
  }

  setGameState(gameState: GameState) {
    this.gameService.setGameState(gameState);
  }

  revertToPrevious() {
    this.gameService.revertToPrevious();
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }
}
