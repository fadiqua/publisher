import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/rootReducer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
export const sagaMiddleware = createSagaMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const routerMid = routerMiddleware(history);

// add support for Redux dev tools
const composeEnhancers = process.env.NODE_ENV !== 'production' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;

function configureStore(initialState) {
    const middlewares = [
        routerMid,
        sagaMiddleware,
    ];

    return createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );
}
export default configureStore;