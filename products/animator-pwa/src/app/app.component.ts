import {Component} from '@angular/core';
import {NgxOpenCVService, OpenCVState} from 'ngx-opencv';
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";
import {BerMat, Point, Square} from "./square";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animator-pwa';

  public square?: Square;
  public cv: any;
  private cvState?: string;
  // latest snapshot
  public webcamImage?: WebcamImage;
  private preImage?: BerMat;
  private trigger: Subject<void>;
  private interval?: ReturnType<typeof setInterval>;
  downloadFilehref?: any = "";
  animation1: ImageData[] = [];
  animation2: ImageData[] = [];
  currentImage = 0;
  walkingDistance = 0;
  walkingDirection = 1;
  currentAnimation = this.animation1;

  constructor(private ngxOpenCv: NgxOpenCVService, private httpClient: HttpClient) {
    this.trigger = new Subject<void>();
    this.httpClient.get('assets/originalImage.txt', {responseType: 'text'})
    .subscribe(data => {
        let berMat = JSON.parse(data) as BerMat;
        berMat.data = Object.keys(berMat.data).map(key => berMat.data[key as any]);
        this.preImage = berMat;
    });
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
          this.interval = setInterval(() => this.trigger.next(), 50);
        }
      }
    );
  }

  handleImage($event: WebcamImage): void {
    this.webcamImage = $event;
  }

  convertToOpenCV() {
    const cv = this.cv;
    let src;
    if(this.preImage) {
      clearInterval(this.interval);
      src =  cv.matFromArray(this.preImage.rows, this.preImage.cols, this.preImage.type, this.preImage.data);
    } else {
      src = cv.imread('image');
    }

    let squares: Square[] = [];
    let temp = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    cv.cvtColor(src, temp, cv.COLOR_RGBA2GRAY, 0);
    cv.medianBlur(temp, temp, 5);
    cv.Canny(temp, temp, 50, 100, 3, true);
    cv.imshow("canvas-filter2d", temp);

    let M = cv.Mat.ones(3, 3, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    cv.dilate(temp, temp, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow("canvas-dilate", temp);
    M.delete();

    let MA = cv.matFromArray(3, 3, 5, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
    let anchora = new cv.Point(-1, -1)
    cv.filter2D(temp, temp, cv.CV_8U, MA, anchora, 100, cv.BORDER_DEFAULT);
    cv.imshow("canvas-threshold", temp);
    MA.delete();

    let contours = new cv.MatVector();
    let result = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    this.cv.findContours(temp, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
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
        if(aspectRatio > 0.9 && aspectRatio < 1.1 && boundingRect.width > 80) {
          result.push_back(tmp);
        }
      }
      cnt.delete(); tmp.delete();
    }

    for(let i=0; i<result.size(); i++) {
      let color = new cv.Scalar(0, 255, 0)
      cv.drawContours(dst, result, i, color, 2, cv.LINE_8, hierarchy, 0);
      const contour = result.get(i);
      let points: Point[] = [];
      for(let j=0; j<contour.data32S.length; j+=2) {
        let x = contour.data32S[j]
        let y = contour.data32S[j+1]
        points.push(new Point(x,y));
      }
      squares.push(new Square(points));
    }


    cv.imshow("canvas", dst);

    if(squares.length > 11) {
      let realSquares: Square[] = []
      squares.forEach(squareA => {
        if(squareA.isRealSquare() && !realSquares.some(squareB => squareB.equals(squareA))) {
          realSquares.push(squareA);
        }
      });
      realSquares.sort((a, b) => {
        if(a.y - b.y < -5) {
          return -1;
        } else if(a.x - b.x < -5) {
          return -1
        } else {
          return 1;
        }
      });

      if(realSquares.length > 11) {
        clearInterval(this.interval);
        this.drawSquares(src, realSquares);
      }
    }

    src.delete(); dst.delete(); contours.delete(); hierarchy.delete(); result.delete();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  drawSquares(src: any, squares: Square[]): void {
    const cv = this.cv;
    let drawing = new cv.Mat();
    let vector = new cv.MatVector();
    squares.forEach(square => {
      let temp = src.clone();
      let roi = temp.roi(new cv.Rect(square.x, square.y,squares[0].length,squares[0].length));
      vector.push_back(roi);
      roi.delete();
    });
    cv.hconcat(vector, drawing);

    cv.imshow("drawing", drawing);
    if(!this.preImage){
      let a = document.createElement('a');
      var file = new Blob([JSON.stringify(new BerMat(src.rows, src.cols, cv.CV_8UC4, src.data))], {type: 'text/plain'});
      a.href = URL.createObjectURL(file);
      a.download = "originalImage";
      a.click();
    }
    vector.delete();
    drawing.delete();

    let canvas = document.getElementById("drawing") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    for(let i=0; i<4; i++) {
      this.animation1[i] = ctx.getImageData(i * squares[0].length, 0, squares[0].length, squares[0].length);
      this.animation2[i] = this.mirrorImageData(this.animation1[i]);
    }
    this.animateCharacter();
  }

  animateCharacter() {
    let canvas = document.getElementById("animation") as HTMLCanvasElement;
    let ctx = canvas.getContext('2d')!;
    canvas.width = 1000;
    ctx.putImageData(this.currentAnimation[1], 0, 0);
    setInterval(() => {
      if(this.walkingDistance > canvas.width) {
        this.walkingDirection = -1;
        this.currentAnimation = this.animation2;
      } else if (this.walkingDistance < -100) {
        this.walkingDirection = 1;
        this.currentAnimation = this.animation1;
      }
      ctx.clearRect( 0, 0, 1000, this.animation1[this.currentImage].height)
      ctx.putImageData(this.currentAnimation[this.currentImage], this.walkingDistance, 0);
      this.walkingDistance = this.walkingDistance + 25*this.walkingDirection;
      this.currentImage = ++this.currentImage % 4;
    }, 150);
  }

  mirrorImageData(imageData: ImageData) : ImageData{
    let image = [] as any;
    for(let k=0; k<imageData.height; k++) {
      let row = [] as any;
      for (let i = 0; i < imageData.width; i++) {
        let pixel = [] as any;
        for (let j = 0; j < 4; j++) {
          pixel.push(imageData.data[j + 4*i + imageData.height*k*4]);
        }
        row.push(pixel);
      }
      let reversed = row.reverse();
      let reverseRow = [].concat(...reversed);
      image.push(reverseRow);
    }
    let reversedImage = [].concat(...image);

    let array = Uint8ClampedArray.from(reversedImage);
    return new ImageData(array, imageData.width, imageData.height);
  }
}
