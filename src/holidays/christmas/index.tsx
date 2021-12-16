import React, { Fragment, FunctionComponent } from "react";
import { LocalStorageKeys, useLocalStorageState } from "../../util/local-storage";
import { Snowflakes } from "./Snowflakes";
import { Snowman } from "./Snowman";

export const Christmas: FunctionComponent = () => {
    const [isActive] = useLocalStorageState<boolean>(LocalStorageKeys.ALL, true);

    return (
        <div>
            {isActive && (
                <Fragment>
                    <Snowflakes />
                    <Snowman />
                </Fragment>
            )}
        </div>
    );
};