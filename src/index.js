import jQuery from "jquery";
import { Hub } from "./hashRouter";
import "./styles.css";

const $ = jQuery;

$(function () {
    Hub.route(`products/:firstVar/:someVar/bobby/#num/random`, (data) => {
        console.info(data);
    });

    $("body").on("click", "#trigger", function () {
        // forwarding
        // Hub.navigate(`/products/12/22/bobby/gagagaga/random`);
        Hub.navigate(`/products/12/22/bobby/123/random`);
    });
    $("body").on("click", "#reg", function () {
        // forwarding
        Hub.route(`new/#userId`, (data) => {
            console.info("NEW", data);
        });
        setTimeout(() => {
            Hub.navigate(`new/52`);
        }, 200);
    });
    $("body").on("click", "#des", function () {
        // forwarding
        Hub.routeOff(`new/#userId`);
    });
});
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <div id="routeInfo"><code><pre id="routeJson"></pre></code></div>
  <div id="trigger">TRIGGER</div>
  <br/>
  <div id="reg">REGISTER NEW ROUTE</div>
  <div id="des">DESTROY NEW ROUTE</div>
</div>
`;
