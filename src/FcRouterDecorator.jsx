import React from 'react';
import MyContext from './FcRouterContext';

export function injectRouter(Component) {
    return class extends React.Component {
        render() {
            return (
                <MyContext.Consumer>
                    {fcRouter => <Component {...this.props} fcRouter={fcRouter} />}
                </MyContext.Consumer>
            );
        }
    }
}
