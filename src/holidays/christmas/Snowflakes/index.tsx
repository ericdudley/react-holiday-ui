import React, { FunctionComponent, useEffect, useRef } from 'react';
import { fixedFullscreen } from '../../../util/style';
import { Flakes } from './Flakes';
const STEP_DURATION_MS = 50;
const ADD_FLAKE_INTERVAL_MS = 500;


/**
 * Renders gently falling snowflakes represented by light blue circles that start at the top of the screen and fall to the bottom.
 */
export const Snowflakes: FunctionComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Set up snowflakes effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', onResize);



        const flakes = new Flakes(ctx);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const addFlakeInterval = setInterval(flakes.addRandom, ADD_FLAKE_INTERVAL_MS);
        const stepInterval = setInterval(flakes.stepAll, STEP_DURATION_MS);
        const draw = () => {
            ctx.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
            flakes.drawAll();
            requestAnimationFrame(draw);
        }
        draw();


        return () => {
            clearInterval(addFlakeInterval);
            clearInterval(stepInterval);
            window.removeEventListener('resize', onResize);
        }
    }, []);


    return <canvas ref={canvasRef} style={fixedFullscreen()}></ canvas >
};