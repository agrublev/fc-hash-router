import React from "react";
import MyContext from "./FcRouterContext";
import { FcRouter } from "./FcRouter";

class FcRouterProvider extends React.Component {
    state = {
        route: window.location.hash.substring(1)
    };
    componentDidMount() {
        window.navigation.addEventListener("navigate", this.navHandle);
    }
    componentWillUnmount() {
        document.removeEventListener("navigate", this.navHandle, false);
    }
    navHandle = (event) => {
        const url = new URL(event.destination.url);
        this.setState({
            route: url.hash.substring(1)
        });
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    routes: FcRouter.routes,
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
                    }
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
