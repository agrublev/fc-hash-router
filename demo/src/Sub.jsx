import { Component } from "react";
import { FcRouter, injectRouter } from "../../src";

FcRouter.route(`/home/sub`, () => {
    return <Sub />;
});
@injectRouter
export class Sub extends Component {
    render() {
        return <div>SAD</div>;
    }
}
