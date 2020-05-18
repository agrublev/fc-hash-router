import "./styles.css";
import Router from "./router.js";
import jQuery from "jquery";
import routie from "./routie.js"

const $ = jQuery;

// configuration
Router.config({mode: "hash"});

// // returning the user to the initial state
Router.navigate();

// adding routes
Router.add(/about/, function () {
	console.log("about");
})
.add(/products\/(.*)\/edit\/(.*)/, function () {
	const [productId, itemId] = arguments;
	console.log("pro2ducts", productId, itemId);
	$("#routeJson").html(`${JSON.stringify({productId, itemId}, null, 4)}`)
})
.add(function () {
	// $("#routeJson").html(`${JSON.stringify({}, null, 4)}`)
})
.check("/products/12/edit/22")
.listen();

routie('/users/:name/?:appId', function (...params) {
	console.info("Console --- NAME", params);
	$("#routeJson").html(`${JSON.stringify(params, null, 4)}`)
});
routie('/any/*/:userid', function (params) {
	const [random, userId] = params
	console.info("Console --- NAME", {random, userId});
	$("#routeJson").html(`${JSON.stringify({random, userId}, null, 4)}`)
});

$(function () {

	$("body").on("click", ".goRoute", function () {
		// forwarding
		Router.navigate($(this).data("route"));
	});
	$("body").on("click", ".goRoutie", function () {
		// forwarding
		routie($(this).data("route"));
	});
})
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <div id="routeInfo"><code><pre id="routeJson"></pre></code></div>
  <div class="goRoute" data-route="/about">Go about</div>
  <div class="goRoute" data-route="/products/12/edit/22">PRODUCTS</div>
  
  <div class="goRoutie" data-route="/users/bob/51">ROUTIE PASS BOB AND USER ID</div>
  <div class="goRoutie" data-route="/users/bobby">ROUTIE PASS BOB and not user id as it's optional</div>
  <div class="goRoutie" data-route="/any/nana/5252">ROUTIE PASS BOB and not user id as it's optional</div>
  <div class="goRoutie" data-route="/any/5252/atja">ROUTIE PASS BOB and not user id as it's optional</div>
  <a href="#/any/ahah/5252">TEST</a>
</div>
`;
