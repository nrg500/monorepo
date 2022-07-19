import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Output()
  startButtonClicked = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}
