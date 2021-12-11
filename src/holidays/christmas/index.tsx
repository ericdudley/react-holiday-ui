import React, { Fragment, FunctionComponent, useState } from "react";
import { ToggleButton } from "../../components/ToggleButton";
import { fixedBottomRight } from "../../util/style";
import { Snowflakes } from "./Snowflakes";
import { Snowman } from "./Snowman";

export const Christmas: FunctionComponent = () => {
    const [isActive, setIsActive] = useState(true);

    const toggleIsActive = () => {
        setIsActive((prev) => !prev);
    }

    return (
        <div>
            {isActive && (
                <Fragment>
                    <Snowflakes />
                    <Snowman />
                </Fragment>
            )}
            <ToggleButton style={fixedBottomRight({ bottom: 8, right: 8, pointerEvents: true })} isActive={isActive} onClick={toggleIsActive} />
        </div>
    );
};