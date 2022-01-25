// import { HashRouter } from "fc-hash-router";
import { HashRouter } from "../src/hashRouter";
import jQuery from "jquery";
import "./styles.css";

const $ = jQuery;

$(function () {
    HashRouter.route(`products`, (data) => {
        console.info("products plain", data);
        $("#routeJson").html(`${JSON.stringify(data, null, 4)}`);
    });

    HashRouter.route(`products/:firstVar/:someVar/bobby/#num/random`, (data) => {
        console.info("products advanced", data);
        $("#routeJson").html(`${JSON.stringify(data, null, 4)}`);
    });

    $("body").on("click", "#trigger", function () {
        HashRouter.navigate(
            `/products/12/22/bobby/${Math.round(Math.random() * 99999)}/random`
        );
    });

    $("body").on("click", "#trigger1", function () {
        HashRouter.navigate(`/products`);
    });

    $("body").on("click", "#reset", function () {
        HashRouter.navigate(`/`);
        history.pushState("", document.title, window.location.pathname + window.location.search);
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
