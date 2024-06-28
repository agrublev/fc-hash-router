import { Component } from "react";

export class Test extends Component {
    render() {
        console.log("", this.props);
        return (
            <div className={"cont"}>
                <h2>TEST</h2>
            </div>
        );
    }
}
