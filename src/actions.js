import serializeError from 'serialize-error';
import { each } from 'lodash/collection';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import * as constants from './constants';

const HOST = window.location.host.split(":")[0];

const PROXY_URL = `http://${HOST}:1337/jira.danateq.net:443/rest/api/2`;

async function doRequest(token, apiUrl, method, payload) {
    const result = await fetch(
        `${PROXY_URL}${apiUrl}`, {
            headers: new Headers({
                Authorization: token,
                'Content-Type': 'application/json',
            }),
            credentials: 'include',
            method,
            body: payload ? JSON.stringify(payload) : undefined
        },
    );
    try {
        const rawResponse = await result.text();
        const responseJson = rawResponse === "" ? {} : JSON.parse(rawResponse);
        if (![200, 201, 204].includes(result.status)) {
            const error = new Error(responseJson.errorMessages[0]);
            error.jiraErrors = responseJson.errors;
            throw error;
        }
        return responseJson;
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new Error(`${result.status} ${result.statusText}`);
        }
        throw e;
    }
}

export function incFoo() {
    return { type: actionTypes.INC_FOO };
}

export function decFoo() {
    return { type: actionTypes.DEC_FOO };
}

export const initFromJiraItem = rawSubtasks => ({
    type: actionTypes.INIT_FROM_JIRA_ITEM,
    payload: { rawSubtasks }
});

export const fetchStatuses = () => async function(dispatch, getState, api) {
    const state = getState();
    const url = `/status`;
    const token = selectors.getBasicAuthToken(state);
    dispatch({
        type: actionTypes.FETCH_STATUSES_PENDING
    });
    try {
        const responseJson = await doRequest(token, url, 'GET');
        dispatch({
            type: actionTypes.FETCH_STATUSES_SUCCESS,
            payload: { responseJson },
        });
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_STATUSES_FAIL,
            payload: { error: serializeError(error) }
        });
    }
};

export const fetchSubtasks = () => async function(dispatch, getState, api) {
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    const token = selectors.getBasicAuthToken(state);
    const url = `/search?jql=parent=${rootItemKey}`;
    dispatch({
        type: actionTypes.FETCH_SUBTASKS_PENDING
    });
    try {
        const responseJson = await doRequest(token, url, 'GET');
        dispatch({
            type: actionTypes.FETCH_SUBTASKS_SUCCESS,
            payload: { responseJson },
        });
        dispatch(initFromJiraItem(responseJson));
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_SUBTASKS_FAIL,
            payload: { error: serializeError(error) }
        });
    }
};

export const fetchJiraItem = () => async function(dispatch, getState, api) {
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    const token = selectors.getBasicAuthToken(state);
    dispatch({ type: actionTypes.FETCH_JIRA_ITEM_PENDING });
    const url = `/issue/${rootItemKey}`;
    try {
        const responseJson = await doRequest(token, url, 'GET');
        dispatch({
            type: actionTypes.FETCH_JIRA_ITEM_SUCCESS,
            payload: { jiraItem: responseJson }
        });
        dispatch(fetchSubtasks());
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_JIRA_ITEM_FAIL,
            payload: { error: serializeError(error) }
        });
    }
};

export const discardAll = () => async function(dispatch, getState, api) {
    dispatch({
        type: actionTypes.DISCARD_ALL
    });
    // localStorage.setItem(constants.NAME, "{}");
    dispatch(fetchJiraItem());
};

export const updateSubtask = (task) => async function(dispatch, getState, api) {
    const state = getState();
    dispatch({ type: actionTypes.UPD_SUBTASK_PENDING });
    const {
        label,
        summary,
        description,
        key,
        estimate,
    } = task;
    const url = `/issue/${key}`;
    const requestPayload = {
        fields: {
            summary: `${label}: ${summary}`,
            description,
            timetracking: {
                originalEstimate: estimate
            }
        }
    };
    const token = selectors.getBasicAuthToken(state);
    try {
        const responseJson = await doRequest(token, url, 'PUT', requestPayload);
        dispatch({
            type: actionTypes.UPD_SUBTASK_SUCCESS,
            payload: { task, responseJson }
        });
    } catch (error) {
        dispatch({
            type: actionTypes.UPD_SUBTASK_FAIL,
            payload: { task, error: serializeError(error) }
        });
    }
};

export const createSubtask = (task) => async function(dispatch, getState, api) {
    dispatch({ type: actionTypes.CREATE_SUBTASK_PENDING });
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    const rndDevName = selectors.getRndDevName(state);
    const jiraItem = selectors.getJiraItem(state);
    const url = `/issue`;
    const {
        label,
        summary,
        description,
        estimate,
    } = task;
    const requestPayload = {
        fields: {
            project: {
                key: jiraItem.fields.project.key,
            },
            parent: {
                key: rootItemKey
            },
            summary: `${label}: ${summary}`,
            description,
            issuetype: {
                id: 5 // subtask
            },
            timetracking: {
                originalEstimate: estimate
            },
            [constants.CUST_FIELD_RND_DEVISION]: {
                value: rndDevName
            }
        }
    };
    const token = selectors.getBasicAuthToken(state);
    try {
        const responseJson = await doRequest(token, url, 'POST', requestPayload);
        dispatch({
            type: actionTypes.CREATE_SUBTASK_SUCCESS,
            payload:{ task, newItemDetails: responseJson }
        });
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_SUBTASK_FAIL,
            payload: { task, error: serializeError(error) }
        });
    }
};

export const syncWithJira = () => async function(dispatch, getState, api) {
    dispatch({
        type: actionTypes.CLEAR_ERROR
    });
    const state = getState();
    const subtasks = selectors.getSubtasks(state);
    const error = selectors.getError(state);
    each(subtasks, task => {
        const {
            key,
            dirty,
        } = task;
        if (!dirty) return;
        if (error) return;
        if (key) {
            dispatch(updateSubtask(task));
        } else {
            dispatch(createSubtask(task));
        }
    });
};

export const addSubtask = () => ({
    type: actionTypes.ADD_SUBTASK
});

export const updSubtask = (id, fields) => ({
    type: actionTypes.UPD_SUBTASK,
    payload: { id, fields },
});

export const delSubtask = id => ({
    type: actionTypes.DEL_SUBTASK,
    payload: { id },
});

export const updUser = val => ({
    type: actionTypes.UPD_USER,
    payload: { val },
});

export const updPass = val => ({
    type: actionTypes.UPD_PASS,
    payload: { val },
});

export const updRootItemKey = rootItemKey => async function(dispatch, getState, api) {
    dispatch({
        type: actionTypes.UPD_ROOT_ITEM_KEY,
        payload: { rootItemKey }
    });
    dispatch(fetchJiraItem());
};

export const updFocusFactor = focusFactor => ({
    type: actionTypes.UPD_FOCUS_FACTOR,
    payload: { focusFactor }
});
