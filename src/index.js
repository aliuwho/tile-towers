import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Game} from "./game";

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
const initTypes = Game.generateTypes();
let minDim = Math.min(window.innerWidth, window.innerHeight)
export const tileDim = Math.max(minDim / 15, 25);

root.render(<Game types={initTypes}
                  tileDim={tileDim}/>);