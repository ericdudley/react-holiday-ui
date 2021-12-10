import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Flakes } from './Flakes';
const STEP_DURATION_MS = 50;
const ADD_FLAKE_INTERVAL_MS = 500;
const MAX_FLAKES_COUNT = 20000;


/**
 * Renders gently falling snowflakes represented by light blue circles that start at the top of the screen and fall to the bottom.
 */
export const Snowflakes: FunctionComponent = () => {
    const flakesRef = useRef<Flakes>(new Flakes());
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Set up snowflakes effect
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

        // Creates new flakes a continuous interval
        const addFlakeInterval = setInterval(() => {
            const flakes = flakesRef.current!;
            if(flakes.count < MAX_FLAKES_COUNT){
                flakes.addRandom(0, canvas.width);
            }
            flakes.removeOutOfBounds(canvas.width, canvas.height);
        }, ADD_FLAKE_INTERVAL_MS);

        // Steps flake positions on a continuous interval
        const stepInterval = setInterval(() => {
            if(flakesRef.current){
                flakesRef.current.stepAll();
            }
        }, STEP_DURATION_MS);

        // Draw current flake positions to the canvas in an animation frame loop
        const draw = () => {
            ctx.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
            if(flakesRef.current){
                flakesRef.current.drawAll(ctx);
            }
            requestAnimationFrame(draw);
        }
        draw();


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