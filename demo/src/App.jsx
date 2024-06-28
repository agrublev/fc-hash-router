import { Component } from "react";
import "./App.css";
import { Home } from "./Home";
import { Main } from "./Main";
import { injectRouter, FcRouter } from "../../src/index";
import { Test } from "./Test";

FcRouter.setRoutes([
    { url: "/home", component: <Home /> },
    { url: "/main", component: <Main /> },
    { url: "/test", component: <Test /> },
    { url: "/", component: <div>EMPTY</div> },
]);

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
