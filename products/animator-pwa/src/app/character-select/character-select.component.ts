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
    if(this.gameService.player1) {
      let canvas = document.getElementById("player1animation1") as HTMLCanvasElement;
      let ctx = canvas.getContext("2d")!;

      if(this.gameService.player1) {
        console.log(`width: ${this.gameService.player1.imageData[0].width}, height: ${this.gameService.player1.imageData[0].height}`);
        createImageBitmap(this.gameService.player1.imageData[0])
        .then(next => {
          ctx.drawImage(next, 0,0, next.width, next.height);
          // ctx.drawImage(next, 0, 0, next.height, next.width, 0, 0, 100, 100);
        })

      }
    };
  }

  loadCharacter(playerNumber: number) {
    this.gameService.selectingCharacter = playerNumber;
    this.gameService.setGameState(GameState.LOADING_CHARACTER);
  }

}
