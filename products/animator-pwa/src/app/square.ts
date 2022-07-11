export class Square {
  points: Point[];
  x: number;
  y: number;
  length: number;
  constructor(points: Point[]) {
    this.points = points;
    this.x = Math.min(...this.points.map(point => point.x));
    this.y = Math.min(...this.points.map(point => point.y));
    this.length = Math.max(...this.points.map(point => point.x)) - this.x;
  }

  equals(squareOther: Square): boolean {
    return this.points.every(pointA => squareOther.points.some(pointB => pointB.overlapsWith(pointA)));
  }

  isRealSquare(): boolean {
    let matchingXPoints: [Point, Point][] = [];
    let matchingYPoints: [Point, Point][] = [];
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        if (Math.abs(this.points[i].x - this.points[j].x) < 5) {
          matchingXPoints.push([this.points[i], this.points[j]]);
        }
        if (Math.abs(this.points[i].y - this.points[j].y) < 5) {
          matchingYPoints.push([this.points[i], this.points[j]]);
        }
      }
    }
    return matchingXPoints.length === 2 && matchingYPoints.length === 2;
  }

  correctedSquare() {
    for(let i = 0; i<this.points.length; i++) {
      for(let j = i+1; j<this.points.length; j++) {
        if(Math.abs(this.points[i].x - this.points[j].x) < 10) {
          console.log(`points ${i} and ${j} match on x coordinate: ${(this.points[j].x + this.points[i].x) / 2}`);
        }
        if(Math.abs(this.points[i].y - this.points[j].y) < 10) {
          console.log(`points ${i} and ${j} match on y coordinate: ${(this.points[j].y + this.points[i].y) / 2}`);
        }
      }
    }
  }
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  overlapsWith(p: Point): boolean {
    return (Math.abs(p.x - this.x) < 10) && (Math.abs(p.y - this.y) < 10);
  }
}

export class BerMat {
  rows: number;
  cols: number;
  type: number;
  data: number[];
  constructor(rows:number, cols:number, type: number, data:number[]) {
    this.rows = rows;
    this.cols = cols;
    this.type = type;
    this.data = data;
}
}
