import { Flake } from "./Flake";
import { ValueRef } from "./ValueRef";

/**
 * Class that manages a list of flakes to be updated and drawn.
 */
export class Flakes {
    private _flakes: Flake[];

    // Global wind that affects all flakes.
    private _wind: ValueRef<number>;
    private _windTheta: number;

    constructor() {
        this._flakes = [];
        this._wind = new ValueRef<number>(0);
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
    public addRandom(minX: number, maxX: number): void {
        this._flakes.push(Flake.withinBounds(minX, maxX, this._wind));
    }

    /**
     * Removes flakes with (x, y) position outside of ([0, maxX], [0, maxY])
     */
    public removeOutOfBounds(maxX: number, maxY: number): void {
            const newFlakes = this._flakes.filter(flake => flake.x >= 0 && flake.x <= maxX && flake.y >= 0 && flake.y <= maxY);
            this._flakes = newFlakes;
    }

    /**
     * Draws all flakes.
     */
    public drawAll(ctx: CanvasRenderingContext2D): void {
        this._flakes.forEach(flake => flake.draw(ctx));
    }

    /**
     * Steps all flakes.
     */
    public stepAll(): void {
        // Update wind strength.
        this._windTheta += 0.01;
        this._wind.value = Math.abs(2 * Math.pow(Math.sin(this._windTheta), 10));

        this._flakes.forEach(flake => flake.step());
    }
}