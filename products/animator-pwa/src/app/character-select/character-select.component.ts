import { Component, OnInit } from '@angular/core';
import {GameState} from "../game/GameState";
import {GameService} from "../game.service";

@Component({
  selector: 'character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  bothCharactersSelected: boolean = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  loadCharacter() {
    this.gameService.setGameState(GameState.LOADING_CHARACTER);
  }

}
