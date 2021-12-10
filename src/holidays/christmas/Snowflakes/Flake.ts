import { ValueRef } from "./ValueRef";

const MIN_FLAKE_SIZE = 2;
const MAX_FLAKE_SIZE = 5;
const MIN_VX = -0.25;
const MAX_VX = 0.25;
const MIN_VY = 1.5;
const MAX_VY = 2.5;
const FILL_COLOR = '#A0E3F6'
const MIN_RANDOM_FACTOR = 0.9;
const MAX_RANDOM_FACTOR = 1.1;

/**
 * Represents a snowflake particle that falls from the top of the screen with some random render offset to seem more natural.
 * x, y, xy, and vy make the flake fall in a straight line at a constant velocity.
 * offsetX, offsetY, and theta control a render offset from the actual x, y position of the flake.
 * 
 */
export class Flake {
    // Particle position + velocity
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public parallaxRatio: number;

    // Particle render offset
    public offsetX: number;
    public offsetY: number;
    public theta: number;
    // Random values close to 1.0 that make each flake's render offset function slightly different
    public xRandom: number;
    public yRandom: number;

    // Render properties
    public size: number;

    // Ref 
    public windRef: ValueRef<number>;

    constructor(x: number, y: number, vx: number, vy: number, size: number, windRef: ValueRef<number>) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.parallaxRatio = (0.5 + 0.5 * ((size - MIN_FLAKE_SIZE) / (MAX_FLAKE_SIZE - MIN_FLAKE_SIZE)));

        this.offsetX = 0;
        this.offsetY = 0;
        this.theta = 0;
        this.xRandom = MIN_RANDOM_FACTOR + Math.random() * (MAX_RANDOM_FACTOR - MIN_RANDOM_FACTOR);
        this.yRandom = MIN_RANDOM_FACTOR + Math.random() * (MAX_RANDOM_FACTOR - MIN_RANDOM_FACTOR);
        
        this.size = size;
        
        this.windRef = windRef;
    }

    public draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(this.x + this.offsetX, this.y + this.offsetY, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = FILL_COLOR;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.closePath();
    }

    public step = (): void => {
        this.theta += 0.1;
        this.x += this.parallaxRatio * (this.vx + (this.windRef.value || 0));
        this.y += this.parallaxRatio * this.vy;
        this.offsetX = (this.xRandom * 2) * Math.pow(Math.sin((this.xRandom * 0.25) * this.theta) + Math.sin(this.theta), 3);
        this.offsetY = (this.yRandom * 25) * Math.pow(Math.sin((this.yRandom * 0.1) * this.theta), 4);
    }

    public static withinBounds = (xMin: number, xMax: number, windRef: ValueRef<number>): Flake => {
        const x = Math.random() * (xMax - xMin) + xMin;
        const y = 0;
        const size = Math.random() * (MAX_FLAKE_SIZE - MIN_FLAKE_SIZE) + MIN_FLAKE_SIZE;
        const vx = Math.random() * (MAX_VX - MIN_VX) + MIN_VX;
        const vy = Math.random() * (MAX_VY - MIN_VY) + MIN_VY;
        return new Flake(x, y, vx, vy, size, windRef);
    }
}