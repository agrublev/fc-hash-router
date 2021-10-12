// import { HashRouter } from "fc-hash-router";
import { HashRouter } from "../src/hashRouter";
import jQuery from "jquery";
import "./styles.css";

const $ = jQuery;

$(function () {
    HashRouter.route(`products/:firstVar/:someVar/bobby/#num/random`, (data) => {
        console.info(data);
        $("#routeJson").html(`${JSON.stringify(data, null, 4)}`);
    });

    $("body").on("click", "#trigger", function () {
        HashRouter.navigate(`/products/${Math.round(Math.random() * 9999)}/22/bobby/123/random`);
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
