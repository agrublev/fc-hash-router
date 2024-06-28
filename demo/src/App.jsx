import { Component } from "react";
import "./App.css";
import { HOME } from "./HOME";
import { Main } from "./Main";
import { injectRouter, FcRouter } from "../../src/index";
import { Test } from "./Test";

FcRouter.route(``, () => {
    return <div>a</div>;
});
FcRouter.route(`/home`, () => {
    return <HOME />;
});
FcRouter.route(`/test`, () => {
    return <Test />;
});
FcRouter.route(`/main`, () => {
    return <Main />;
});
@injectRouter
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className={"menu"}>
                    <button
                        onClick={(e) => {
                            this.props.fcRouter.goBack(``);
                        }}
                    >
                        BACK
                    </button>
                    <button
                        onClick={(e) => {
                            this.props.fcRouter.navigate(`/test`);
                        }}
                    >
                        TEST
                    </button>
                    <button
                        onClick={(e) => {
                            this.props.fcRouter.navigate(`/home`);
                        }}
                    >
                        HOME
                    </button>
                    <button
                        onClick={(e) => {
                            this.props.fcRouter.navigate(`/main`);
                        }}
                    >
                        MAIN
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
