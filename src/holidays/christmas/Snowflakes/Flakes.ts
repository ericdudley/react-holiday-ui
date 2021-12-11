import { Flake } from "./Flake";
import { ValueRef } from "../../../util/ValueRef";

const MAX_FLAKES_COUNT = 200;


/**
 * Class that manages a list of flakes to be updated and drawn.
 */
export class Flakes {
    private _flakes: Flake[];
    private _ctx: CanvasRenderingContext2D;

    // Global wind that affects all flakes.
    private _wind: ValueRef<number>;
    private _windTheta: number;

    constructor(_ctx: CanvasRenderingContext2D) {
        this._flakes = [];
        this._wind = new ValueRef<number>(0);
        this._windTheta = 0;
        this._ctx = _ctx;
    }

    /**
     * The number of active flakes.
     */
    public get count(): number {
        return this._flakes.length;
    }

    /**
     * Adds a new flake within the given x bounds.
     */
    public addRandom = (): void => {
        if (this._flakes.length < MAX_FLAKES_COUNT) {
            this._flakes.push(Flake.withinBounds(0, this._ctx.canvas.width, this._wind));
        }
        this.removeOutOfBounds();
    }

    /**
     * Removes flakes with (x, y) position outside of ([0, maxX], [0, maxY])
     */
    public removeOutOfBounds = (): void => {
        const newFlakes = this._flakes.filter(flake => flake.x >= 0 && flake.x <= this._ctx.canvas.width && flake.y >= 0 && flake.y <= this._ctx.canvas.height);
        this._flakes = newFlakes;
    }

    /**
     * Draws all flakes.
     */
    public drawAll = (): void => {
        this._flakes.forEach(flake => flake.draw(this._ctx));
    }

    /**
     * Steps all flakes.
     */
    public stepAll = (): void => {
        // Update wind strength.
        this._windTheta += 0.01;
        this._wind.value = Math.abs(2 * Math.pow(Math.sin(this._windTheta), 10));

        this._flakes.forEach(flake => flake.step());
    }
}