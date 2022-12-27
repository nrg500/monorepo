import { EventEmitter, Injectable } from '@angular/core';
import { Point } from '../square';
import { GameState, Player } from './gamestate';
import { Sprite } from './sprite';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentState = GameState.MAIN_MENU;
  previousStates: Stack<GameState> = new Stack();
  stateChangedEmitter: EventEmitter<GameState> = new EventEmitter<GameState>();
  player1?: Sprite;
  player2?: Sprite;
  selectingCharacter: Player = Player.PLAYER1;
  playerSaved: EventEmitter<Player> = new EventEmitter<Player>();

  constructor() {
    this.previousStates.push(this.currentState);
  }

  setGameState(gameState: GameState) {
    this.previousStates.push(this.currentState);
    this.currentState = gameState;
    this.stateChangedEmitter.emit(this.currentState);
  }

  revertToPrevious() {
    if (this.previousStates.size() > 0) {
      this.currentState = this.previousStates.pop()!;
      this.stateChangedEmitter.emit(this.currentState);
    }
  }

  savePlayer(playerDimensions: Point, imageBitmaps: ImageBitmap[]) {
    const sprite = new Sprite(playerDimensions, imageBitmaps);
    if (this.selectingCharacter === Player.PLAYER1) {
      this.player1 = sprite;
    } else {
      this.player2 = sprite;
    }
    this.playerSaved.emit(this.selectingCharacter);
  }

  getPlayer(player: Player) {
    switch (player) {
      case Player.PLAYER1:
        return this.player1;
      case Player.PLAYER2:
        return this.player2;
      default:
        return undefined;
    }
  }
}

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) { }

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}


