import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
import { WebcamImage } from "ngx-webcam";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animator-pwa';

  public cv: any;
  private cvState?: string;
  // latest snapshot
  public webcamImage?: WebcamImage;
  private trigger: Subject<void>;

  constructor(private ngxOpenCv: NgxOpenCVService) {
    this.trigger = new Subject<void>();
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
          setInterval(() => this.trigger.next(), 50);
        }
      }
    );
  }

  handleImage($event: WebcamImage): void {
    this.webcamImage = $event;
  }

  convertToOpenCV() {
    const cv = this.cv;
    let src = cv.imread('image');
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.medianBlur(src, src, 5);
    cv.Canny(src, src, 50, 100, 3, true);
    cv.imshow("canvas-filter2d", src);

    let M = cv.Mat.ones(5, 5, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    cv.dilate(src, src, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow("canvas-dilate", src);

    let MA = cv.matFromArray(3, 3, 5, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
    let anchora = new cv.Point(-1, -1)
    cv.filter2D(src, src, cv.CV_8U, MA, anchora, 100, cv.BORDER_DEFAULT);
    cv.imshow("canvas-threshold", src);

    let contours = new cv.MatVector();
    let result = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    this.cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    // draw contours with random Scalar
    for (let i = 0; i < contours.size(); ++i) {
      let tmp = new cv.Mat();
      let cnt = contours.get(i);
      cv.approxPolyDP(cnt, tmp, 3, true);
      if(tmp.rows === 4) {
        let boundingRect = cv.boundingRect(tmp);
        let aspectRatio = 0;
        if(boundingRect.height != 0){
          aspectRatio = boundingRect.width / boundingRect.height;
        }
        if(aspectRatio > 0.9 && aspectRatio < 1.1 && boundingRect.width > 50) {
          result.push_back(tmp);
        }
      }
      cnt.delete(); tmp.delete();
    }

    for(let i=0; i<result.size(); i++) {
      let color = new cv.Scalar(0, 255, 0)
      cv.drawContours(dst, result, i, color, 2, cv.LINE_8, hierarchy, 0);
    }

    cv.imshow("canvas", dst);
    src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); result.delete();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
