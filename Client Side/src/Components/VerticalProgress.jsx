import React from "react";
import { Spring } from "react-spring/renderprops";

const  VerticalProgress = ({ progress }) => {
    return (
        <Spring from={{ percent: 0 }} to={{ percent: progress }}>
            {({ percent }) => (
                <div className="progress vertical">
                    <div style={{ height: `${percent}%` }} className="progress-bar">
                        <span className="sr-only">{`${progress}%`}</span>
                    </div>
                </div>
            )}
        </Spring>
    );
};

export default VerticalProgress;
