import { Component } from "react";
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
            <div className="cont">
                <div className={"menu"}>
                    <button
                        onClick={(e) => {
                            this.props.fcRouter.goBack(``);
                        }}
                    >
                        BACK
                    </button>
                    <button
                        className={`${this.props.fcRouter.route === "/test" ? "active" : ""}`}
                        onClick={(e) => {
                            this.props.fcRouter.navigate(`/test`);
                        }}
                    >
                        TEST
                    </button>
                    <button
                        className={`${this.props.fcRouter.route === "/home" ? "active" : ""}`}
                        onClick={(e) => {
                            this.props.fcRouter.navigate(`/home`, { sad: 22, zzz: 99999 });
                        }}
                    >
                        HOME
                    </button>
                    <button
                        className={`${this.props.fcRouter.route === "/main" ? "active" : ""}`}
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
