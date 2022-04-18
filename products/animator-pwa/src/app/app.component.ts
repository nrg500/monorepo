import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animator-pwa';

  public cv: any;
  private cvState?: string;
  private opencvSrc: any;

  constructor(private ngxOpenCv: NgxOpenCVService) {
    this.ngxOpenCv.cvState.subscribe(
      (cvState: OpenCVState) => {
          this.cvState = cvState.state;
          if (cvState.error) {
            console.log("ERROR");
          } else if (cvState.loading) {
            console.log("LOADING");
          } else if (cvState.ready) {  
            console.log("READY");
            this.cv = cv.__zone_symbol__value
            // do image processing stuff
          }  
      }
    )
  }

  // latest snapshot
  public webcamImage?: WebcamImage;

  private trigger: Subject<void> = new Subject<void>();

  handleImage($event: WebcamImage): void {
    this.webcamImage = $event;
  }

  convertToOpenCV() {
    let image = this.cv.imread("image");
    this.cv.imshow("canvas", image);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {
      this.trigger.next();
  }
}
