import { Component } from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animator-pwa';

  // latest snapshot
  public webcamImage?: WebcamImage;

  private trigger: Subject<void> = new Subject<void>();

  handleImage($event: WebcamImage): void {
    this.webcamImage = $event;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {
      this.trigger.next();
  }
}
