import {EventEmitter, Injectable} from '@angular/core';
import {GameState} from "./game/GameState";
import { Sprite } from './game/sprite';
import { Point } from './square';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentState = GameState.MAIN_MENU;
  previousStates: Stack<GameState> = new Stack();
  stateChangedEmitter: EventEmitter<GameState> = new EventEmitter<GameState>();
  player1?: Sprite;
  player2?: Sprite;
  selectingCharacter = 1;
  playerSaved: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.previousStates.push(this.currentState);
  }

  setGameState(gameState: GameState) {
    this.previousStates.push(this.currentState);
    this.currentState = gameState;
    this.stateChangedEmitter.emit(this.currentState);
  }

  revertToPrevious() {
    if(this.previousStates.size() > 0) {
      this.currentState = this.previousStates.pop()!;
      this.stateChangedEmitter.emit(this.currentState);
    }
  }

  savePlayer(playerDimensions: Point,  imageData: ImageData[]) {
    const sprite = new Sprite(playerDimensions, imageData, []);
    if(this.selectingCharacter == 1) {
      this.player1 = sprite;
    } else {
      this.player2 = sprite;
    }
    this.playerSaved.emit(this.selectingCharacter);
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

  constructor(private capacity: number = Infinity) {}

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


