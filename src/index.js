import jQuery from "jquery";
import { HashRouter } from "./hashRouter";
// import { HashRouter } from "../build/index";
import "./styles.css";
import Router from "./router";

const $ = jQuery;

$(function () {
    HashRouter.navigate();

    HashRouter.route(`products/:firstVar/:someVar/bobby/#num/random`, (data) => {
        console.info(data);
        $("#routeJson").html(`${JSON.stringify(data, null, 4)}`);
    });

    $("body").on("click", "#trigger", function () {
        HashRouter.navigate(`/products/${Math.round(Math.random() * 9999)}/22/bobby/123/random`);
    });
    $("body").on("click", "#reg", function () {
        HashRouter.route(`new/#userId`, (data) => {
            console.info("NEW", data);
            $("#routeJson").html(`${JSON.stringify(data, null, 4)}`);
        });
        setTimeout(() => {
            HashRouter.navigate(`new/52`);
        }, 200);
    });
    $("body").on("click", "#des", function () {
        HashRouter.routeOff(`new/#userId`);
    });
});
document.getElementById("app").innerHTML = `

`;
