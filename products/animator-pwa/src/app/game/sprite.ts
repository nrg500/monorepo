import { Point } from "../square";

export class Sprite {
    spriteDimensions: Point;
    imageData: ImageData[];

    constructor(spriteDimensions: Point, imageData: ImageData[], animations: BerAnimation[]) {
        this.spriteDimensions = spriteDimensions;
        this.imageData = imageData;
    }
}

export class BerAnimation {
    direction: AnimationDirection;
    frames: number[];

    constructor(direction: AnimationDirection, frames: number[]) {
        this.direction = direction;
        this.frames = frames;
    }
}

enum AnimationDirection {
    FORWARD = 1,
    BACKWARD
}