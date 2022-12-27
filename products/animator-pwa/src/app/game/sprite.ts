import { Point } from "../square";
import { Animations } from "./gamestate";

export class Sprite {
    spriteDimensions: Point;
    imageBitmaps: ImageBitmap[];
    animations: Map<Animations, BerAnimation> = new Map();

    constructor(spriteDimensions: Point, imageBitmaps: ImageBitmap[]) {
        this.spriteDimensions = spriteDimensions;
        this.imageBitmaps = imageBitmaps;
    }
}

export class BerAnimation {
    direction: AnimationDirection;
    frames: number[];
    currentFrame = 0;

    constructor(direction: AnimationDirection, frames: number[]) {
        this.direction = direction;
        this.frames = frames;
    }
}

export enum AnimationDirection {
    FORWARD = 1,
    BACKWARD
}