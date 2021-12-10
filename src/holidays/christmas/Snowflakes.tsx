import React, { FunctionComponent, RefObject, useEffect, useRef } from 'react';

const STEP_DURATION_MS = 50;
const MIN_FLAKE_SIZE = 2;
const MAX_FLAKE_SIZE = 5;
const MIN_VX = -0.25;
const MAX_VX = 0.25;
const MIN_VY = 1.5;
const MAX_VY = 2.5;
const MAX_FLAKES_COUNT = 20000;

const FILL_COLOR = '#A0E3F6'

class Flake {
    public x: number;
    public y: number;
    public diffX: number;
    public diffY: number;
    public vx: number;
    public vy: number;
    public theta: number;
    public size: number;
    public xSeed: number;
    public ySeed: number;
    public windRef: RefObject<number>;

    constructor(x: number, y: number, vx: number, vy: number, size: number, windRef: RefObject<number>) {
        this.x = x;
        this.y = y;
        this.diffX = 0;
        this.diffY = 0;
        this.theta = 0;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.xSeed = 0.9 + Math.random() * 0.2;
        this.ySeed = 0.9 + Math.random() * 0.2;
        this.windRef = windRef;
    }

    public draw = (ctx: CanvasRenderingContext2D): void =>{
        ctx.beginPath();
        ctx.arc(this.x + this.diffX, this.y + this.diffY, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = FILL_COLOR;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.globalAlpha = 1.0;
        ctx.fill();
        ctx.closePath();
    }

    public step = (): void => {
        this.x += this.vx + (this.windRef?.current || 0);
        this.y += this.vy;
        this.theta += 0.1;
        this.diffX = (this.xSeed * 2) * Math.pow(Math.sin((this.xSeed * 0.25) * this.theta) + Math.sin(this.theta), 3);
        this.diffY = (this.ySeed * 25) * Math.pow(Math.sin((this.ySeed * 0.1) * this.theta), 4);
    }

    public static  withinBounds = (xMin: number, xMax: number, windRef: RefObject<number>): Flake => {
        const x = Math.random() * (xMax - xMin) + xMin;
        const y = 0;
        const size = Math.random() * (MAX_FLAKE_SIZE - MIN_FLAKE_SIZE) + MIN_FLAKE_SIZE;
        const parallaxRatio = (0.5 + 0.5 * ((size - MIN_FLAKE_SIZE) / (MAX_FLAKE_SIZE - MIN_FLAKE_SIZE)));
        const vx = parallaxRatio * Math.random() * (MAX_VX - MIN_VX) + MIN_VX;
        const vy = parallaxRatio * Math.random() * (MAX_VY - MIN_VY) + MIN_VY;
        return new Flake(x, y, vx, vy, size, windRef);
    }
}

export const Snowflakes: FunctionComponent = () => {
    const flakesRef = useRef<Flake[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const windRef = useRef(0);
    const windTheta = useRef(0);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas){
            return;
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const ctx = canvas.getContext('2d');
        if(!ctx){
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const addFlakeInterval = setInterval(() => {
            const flakes = flakesRef.current!;
            if(flakes.length < MAX_FLAKES_COUNT){
                flakes.push(Flake.withinBounds(0, canvasRef.current?.width || 0, windRef));
            }

            // Remove flakes that are not visible
            const newFlakes = flakes.filter(flake => flake.x > 0 && flake.x < canvas.width || flake.y > 0 && flake.y < canvas.height);
            flakesRef.current = newFlakes;
        }, 500);

        const draw = () => {
            const flakes = flakesRef.current!;
            ctx.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
            ctx.fillStyle = 'red';
            for(const flake of flakes){
                flake.draw(ctx);
            }
            requestAnimationFrame(draw);
        }
        draw();

        const stepInterval = setInterval(() => {
            windTheta.current += 0.01;
            windRef.current = Math.abs(2 * Math.pow(Math.sin(windTheta.current), 10));
            const flakes = flakesRef.current!;
            for(const flake of flakes){
                flake.step();
            }
        }, STEP_DURATION_MS);

        return () => {
            clearInterval(addFlakeInterval);
            clearInterval(stepInterval);
        }
    }, []);


    return <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1000,
    }}></ canvas>
};