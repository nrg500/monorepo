import {EventEmitter, Injectable} from '@angular/core';
import {GameState} from "./game/GameState";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentState = GameState.MAIN_MENU;
  previousStates: Stack<GameState> = new Stack();
  stateChangedEmitter: EventEmitter<GameState> = new EventEmitter<GameState>();

  constructor() {
    this.previousStates.push(this.currentState);
  }

  setGameState(gameState: GameState) {
    this.previousStates.push(this.currentState);
    this.currentState = gameState;
    this.stateChangedEmitter.emit(this.currentState);
  }

  revertToPrevious() {
    console.log(this.previousStates)
    if(this.previousStates.size() > 0) {
      this.currentState = this.previousStates.pop()!;
      this.stateChangedEmitter.emit(this.currentState);
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


