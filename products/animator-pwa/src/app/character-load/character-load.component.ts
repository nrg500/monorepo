import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {GameState} from "../game/GameState";

@Component({
  selector: 'character-load',
  templateUrl: './character-load.component.html',
  styleUrls: ['./character-load.component.scss']
})
export class CharacterLoadComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }



}
