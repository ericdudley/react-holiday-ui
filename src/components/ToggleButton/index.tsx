import React, { FunctionComponent } from "react";
import classes from './styles.css';

interface ToggleButtonProps {
    onClick: () => void;
    isActive: boolean;
    style?: React.CSSProperties;
}

export const ToggleButton: FunctionComponent<ToggleButtonProps> = (props) => {
    return (
        <button className={classes.button} style={props.style} onClick={props.onClick}>
            {props.isActive ? "On" : "Off"}
        </button>
    );
};