import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { debounce } from 'lodash/function';
import { /* omit, */ pick } from 'lodash/object';
import * as constants from './constants';
import { INITIAL_STATE } from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let persistedState = undefined;
const persistedStateString = localStorage.getItem(constants.NAME);
if (persistedStateString) {
    try {
        persistedState = JSON.parse(persistedStateString);
    } catch(e) {
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
                'rootItemKey', 'focusFactor', 'subtaskIdSequence',
                'subtasks', 'user', 'pass'
            ]

        )),
    );
}, 300));

export default store;