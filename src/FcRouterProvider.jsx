import React from "react";
import MyContext from "./FcRouterContext";
import { FcRouter } from "./FcRouter";

class FcRouterProvider extends React.Component {
    state = {
        route: window.location.hash.substring(1),
        // your state here
    };
    componentDidMount() {
        window.navigation.addEventListener("navigate", (event) => {
            const url = new URL(event.destination.url);
            this.setState({
                route: url.hash.substring(1),
            }); // console.log("location changed!");
        });

        window.addEventListener(
            "hashchange",
            () => {
                console.log("The hash has changed!");
            },
            false
        );
    }

    // methods for updating state here

    render() {
        console.log("aa", this.props);
        return (
            <MyContext.Provider
                value={{
                    render: FcRouter.routes[window.location.hash.substring(1)] ? (
                        FcRouter.routes[window.location.hash.substring(1)].handler()
                    ) : (
                        <div>No route set</div>
                    ),
                    route: this.state.route,
                    goBack: () => {
                        FcRouter.goBack();
                    },
                    navigate: (route) => {
                        FcRouter.navigate(route);
                        // this.setState({
                        //     route: HashRouter.routes[window.location.hash.substring(1)].handler(),
                        // });
                        // this.forceUpdate();
                    },
                    // reference methods here
                }}
            >
                <div {...this.props.renderCustom}>
                    {this.props.children}
                    {FcRouter.routes[window.location.hash.substring(1)] ? (
                        FcRouter.routes[window.location.hash.substring(1)].handler()
                    ) : (
                        <div>No route set for blank</div>
                    )}
                </div>
            </MyContext.Provider>
        );
    }
}
export default FcRouterProvider;
