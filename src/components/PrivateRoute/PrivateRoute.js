import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log("parameters", rest);
    return (
        <Route {...rest} render={props => (
            props.user !== {}
                ? <Redirect to={{ pathname: '/chatRoom', state: { from: props.location } }} />
                : <Component {...props} />
        )} />
    )
}