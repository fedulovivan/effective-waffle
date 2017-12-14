import thunk from 'redux-thunk';
import { debounce } from 'lodash/function';
import { /* omit, */ pick } from 'lodash/object';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer, { INITIAL_STATE } from './rootReducer';
import * as constants from './constants';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let persistedState;
const persistedStateString = localStorage.getItem(constants.NAME);
if (persistedStateString) {
    try {
        persistedState = JSON.parse(persistedStateString);
    } catch (e) {
        console.log(e);
    }
}

const store = createStore(
    rootReducer,
    persistedState ? {
        ...INITIAL_STATE,
        ...persistedState,
    } : INITIAL_STATE,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

store.subscribe(debounce(function() {
    localStorage.setItem(
        constants.NAME,
        JSON.stringify(pick(
            store.getState(),
            [
                'rootItemKey', 'focusFactor',
                'subtaskIdSequence', 'subtasks',
                'user', 'pass'
            ]
        )),
    );
}, 500));

export default store;
