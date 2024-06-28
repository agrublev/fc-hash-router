import { Component } from "react";
import { injectRouter } from "../../src";
@injectRouter
export class Main extends Component {
    render() {
        console.log("", this.props);

        return (
            <div className={"cont"}>
                <h2>Main</h2>
            </div>
        );
    }
}
