import { Component } from "react";
import { FcRouter, injectRouter } from "../../src/index";
@injectRouter
class Sub extends Component {
    render() {
        return <div>SAD</div>;
    }
}

FcRouter.route(`/home/sub`, () => {
    return <Sub />;
});
@injectRouter
export class Home extends Component {
    render() {
        console.log("home", this.props);
        return (
            <div>
                <h1>HOME</h1>
                <button
                    onClick={(e) => {
                        this.props.fcRouter.navigate(`/home/sub`);
                        FcRouter.routeOff(`/main`);
                    }}
                >
                    sub
                </button>
            </div>
        );
    }
}
