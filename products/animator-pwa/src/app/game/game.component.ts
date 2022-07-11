import { Component, OnInit } from '@angular/core';
import {GameState} from "./GameState";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentState = GameState.MAIN_MENU;
  constructor() { }

  ngOnInit(): void {
  }
}
