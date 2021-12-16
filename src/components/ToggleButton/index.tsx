import React, { FunctionComponent } from "react";
import { LocalStorageKeys, useLocalStorageState } from "../../util/local-storage";
import classes from './styles.css';

interface ToggleButtonProps {
    style?: React.CSSProperties;
    className?: string;
}

export const ToggleButton: FunctionComponent<ToggleButtonProps> = (props) => {
    const [isActive, setIsActive] = useLocalStorageState<boolean>(LocalStorageKeys.ALL, true);


    return (
        <button className={`${classes.button} ${props.className}`} style={props.style} onClick={() => setIsActive(!isActive)}>
            {isActive ? "On" : "Off"}
        </button>
    );
};