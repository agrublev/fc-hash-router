import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { FcRouterProvider } from "../../src/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <FcRouterProvider renderCustom={{ className: "Lord" }}>
        <App />
    </FcRouterProvider>
);
