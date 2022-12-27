import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Animations, GameState, Player } from "../game/gamestate";
import { AnimationDirection, BerAnimation } from '../game/sprite';

@Component({
  selector: 'character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit, OnDestroy {
  Player = Player;
  Animations = Animations;
  bothCharactersSelected: boolean = false;
  player1idle: string = '';
  canvasIntervals: number[] = [];

  players: Player[] = [Player.PLAYER1, Player.PLAYER2];
  animations: Animations[] = [Animations.IDLE, Animations.RUN, Animations.JUMP, Animations.ATTACK]
  canvasses: HTMLCanvasElement[] = [];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    Object.keys(Player).forEach((player, playerIndex) => {
      Object.keys(Animations).forEach((animation, animationIndex) => {
        if (isNaN(parseInt(player)) && isNaN(parseInt(animation))) {
          const canvas = document.getElementById(player + '.' + animation) as HTMLCanvasElement;
          console.log(player + '.' + animation);
          this.canvasses.push(canvas);
          this.canvasIntervals.push(window.setInterval(() => {
            this.render(canvas, playerIndex, animationIndex)
          }, 200))
        }
      })
    })

  }

  ngOnDestroy(): void {
    this.canvasIntervals.forEach(interval => {
      window.clearInterval(interval);
    });
  }


  render(canvas: HTMLCanvasElement, player: Player, animation: Animations) {
    //
  }

  loadCharacter(player: Player) {
    this.gameService.selectingCharacter = player;
    this.gameService.setGameState(GameState.LOADING_CHARACTER);
  }

  parseAnimation(value: string, player: Player, animation: Animations) {
    const indexes: number[] = []
    const sections = value.split(",");
    for (let i = 0; i < sections.length; i++) {
      const selection = sections[i];
      // if selection is a range
      if (selection.indexOf("-") !== -1) {
        const range = selection.split("-");
        if (range.length == 2) {
          const from = parseInt(range[0]);
          const to = parseInt(range[1]);
          // introduce check if from and to are inside players range.
          if (!isNaN(from) && !isNaN(to) && to >= from && from > 0) {
            for (let j = from; j < to; j++) {
              indexes.push(j - 1);
            }
          }
        }
        // selection is a plain number
      } else {
        const parsed = parseInt(selection);
        // introduce check if parsed is inside players range
        if (!isNaN(parsed) && parsed > 0) {
          indexes.push(parsed - 1);
        }
      }
    }
    this.gameService.getPlayer(player)?.animations.set(animation, new BerAnimation(AnimationDirection.FORWARD, indexes));
  }

}
