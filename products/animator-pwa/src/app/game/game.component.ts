import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameState} from "./GameState";
import {GameService} from "../game.service";
import {Subscription} from "rxjs";

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
      console.log(`received: ${this.currentState}`);
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
