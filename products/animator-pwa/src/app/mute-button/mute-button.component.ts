import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.scss']
})
export class MuteButtonComponent implements OnInit {

  muted = true;
  audio?: HTMLAudioElement;

  constructor() { }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = "../../assets/music/berwout.m4a";
    this.audio.load();
    this.audio.loop = true;
  }

  toggleMute() {
    this.muted = !this.muted;
    if(this.audio && !this.muted){
      this.audio.play();
    } else if(this.audio){
      this.audio.pause();
    }
  }

}
