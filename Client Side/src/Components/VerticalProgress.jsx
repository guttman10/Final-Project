import React from "react";
import { Spring } from "react-spring/renderprops";

const  VerticalProgress = ({ progress }) => {
    return (
        <Spring from={{ percent: 0 }} to={{ percent: progress }}>
            {({ percent }) => (
                <div className="progress vertical">
                    <div style={{ height: `${percent}%`, backgroundColor: progress >= 80 ? "#bd2327" : "#2293dd" }} className="progressBar">
                        <span className="sr-only">{`${progress}%`}</span>
                    </div>
                </div>
            )}
        </Spring>
    );
};

export default VerticalProgress;
