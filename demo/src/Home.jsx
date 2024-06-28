import { Component } from "react";
import { FcRouter, injectRouter } from "../../src/index";
import { Sub } from "./Sub";
@injectRouter
export class Home extends Component {
    render() {
        console.log("", this.props);

        return (
            <div className={"cont"}>
                <h2>HOME</h2>
                <button
                    className={"btn"}
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
