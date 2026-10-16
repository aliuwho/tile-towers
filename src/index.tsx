
// // ========================================
// const root = ReactDOM.createRoot(document.getElementById("root"));

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Game } from "./game";

const rootElement = document.getElementById('root');
if (rootElement) {
    hydrateRoot(rootElement, <React.StrictMode>
        <Game />
    </React.StrictMode>)
}