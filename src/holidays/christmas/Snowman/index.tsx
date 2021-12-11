import React, { FunctionComponent } from "react";
import { SNOWMAN_IMAGE_SRC } from "../../../util/images";
import { fixedBottomRight } from '../../../util/style';
import classes from './styles.css';

export const Snowman: FunctionComponent = () => {
    return <div style={fixedBottomRight()}>
        <img className={classes["snowman-img"]} src={SNOWMAN_IMAGE_SRC} alt="snowman" />
    </div>;
};