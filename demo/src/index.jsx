import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FcRouterProvider } from "../../src/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <FcRouterProvider renderCustom={{ style: { background: "#FFF" } }}>
        <App />
    </FcRouterProvider>
);
