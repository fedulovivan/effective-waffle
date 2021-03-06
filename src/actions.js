import serializeError from 'serialize-error';
import { map } from 'lodash/collection';
// import { get } from 'lodash/object';
import { compact } from 'lodash/array';
import humanizeDuration from 'humanize-duration';
import queryString from 'query-string';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import * as constants from './constants';

const HOST = window.location.host.split(":")[0];

const BACKEND_PATH = `//${HOST}/backend`;

const JIRA_API_PATH = `/jira-connector/api`;

async function doRequest(apiUrl, method, payload) {

    const isGetOrHead = ['GET', 'HEAD'].includes(method);

    if (isGetOrHead && payload) {
        // eslint-disable-next-line no-param-reassign
        apiUrl += `?${queryString.stringify(payload)}`;
    }

    const result = await fetch(
            `${BACKEND_PATH}${apiUrl}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            credentials: 'include',
            method,
            body: !isGetOrHead && payload ? JSON.stringify(payload) : undefined
        },
    );
    try {
        const rawResponse = await result.text();
        const responseJson = rawResponse === "" ? {} : JSON.parse(rawResponse);

        if ([200, 201, 204].includes(result.status)) {
            // positive case
            return responseJson;
        }

        // negative case, throw error
        throw responseJson.error || `Response with error http status contains json without error field`;

        // was received error status
        // const error = new Error(
        //     get(responseJson, 'errorMessages.0')
        //     || get(responseJson, 'error')
        //     || get(responseJson, 'error.message')
        // );
        // error.jiraErrors = responseJson.errors;
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new Error(`${result.status} ${result.statusText}`);
        }
        throw e;
    }
}

export const initFromJiraItem = rawSubtasks => ({
    type: actionTypes.INIT_FROM_JIRA_ITEM,
    payload: { rawSubtasks }
});

export const fetchStatuses = () => async function(dispatch, getState) {
    // const state = getState();
    const url = `${JIRA_API_PATH}/status/getAllStatuses`;
    dispatch({
        type: actionTypes.FETCH_STATUSES_PENDING
    });
    try {
        const responseJson = await doRequest(url, 'GET');
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

export const clearLabelFilter = () => ({
    type: actionTypes.CLEAR_LABEL_FILTER
});

export const fetchSubtasks = () => async function(dispatch, getState) {
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    const url = `${JIRA_API_PATH}/search/search`;
    dispatch({
        type: actionTypes.FETCH_SUBTASKS_PENDING
    });
    try {
        const responseJson = await doRequest(url, 'GET', { maxResults: 500, jql: `parent=${rootItemKey}` });
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

export const updateSession = payload => async function(dispatch, getState) {
    dispatch({ type: actionTypes.UPDATE_SESSION_PENDING });
    const url = `/session`;
    try {
        await doRequest(url, 'PUT', payload);
        dispatch({
            type: actionTypes.UPDATE_SESSION_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_SESSION_FAIL,
            payload: { error: serializeError(error) }
        });
    }
};

export const setSnackbarMessage = message => ({
    type: actionTypes.SET_SNACKBAR_MESSAGE,
    payload: { message },
});

export const clearSnackbar = () => async function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_SNACKBAR });
    dispatch(updateSession({ snackbarMessage: null }));
};

export const fetchSession = () => async function(dispatch, getState) {
    dispatch({ type: actionTypes.FETCH_SESSION_PENDING });
    const url = `/session`;
    try {
        const responseJson = await doRequest(url, 'GET');
        dispatch({
            type: actionTypes.FETCH_SESSION_SUCCESS,
            payload: { responseJson }
        });
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_SESSION_FAIL,
            payload: { error: serializeError(error) }
        });
    }
};

export const fetchJiraItem = () => async function(dispatch, getState) {
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    dispatch({ type: actionTypes.FETCH_JIRA_ITEM_PENDING });
    const url = `${JIRA_API_PATH}/issue/getIssue`;
    try {
        const responseJson = await doRequest(url, 'GET', { issueKey: rootItemKey });
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

export const discardAll = () => async function(dispatch, getState) {
    dispatch({
        type: actionTypes.DISCARD_ALL
    });
    dispatch(fetchJiraItem());
};

export const updLabelFilter = value => ({
    type: actionTypes.UPD_LABEL_FILTER,
    payload: { value },
});

export const updTimeTrackingType = value => ({
    type: actionTypes.UPD_TIME_TRACKING_TYPE,
    payload: { value },
});

export const updateSubtask = (task) => async function(dispatch, getState) {
    // const state = getState();
    dispatch({ type: actionTypes.UPD_SUBTASK_PENDING });
    const {
        label,
        summary,
        description,
        key,
        estimate,
    } = task;
    const url = `${JIRA_API_PATH}/issue/editIssue`;
    const originalEstimate = humanizeDuration(estimate, constants.HUMANISER_OPTS);
    const requestPayload = {
        fields: {
            summary: `${label}: ${summary}`,
            description,
            timetracking: {
                originalEstimate: originalEstimate === '0s' ? '0' : originalEstimate
            }
        }
    };
    try {
        const responseJson = await doRequest(url, 'PUT', { issueKey: key, issue: requestPayload });
        return dispatch({
            type: actionTypes.UPD_SUBTASK_SUCCESS,
            payload: { task, responseJson }
        });
    } catch (error) {
        return dispatch({
            type: actionTypes.UPD_SUBTASK_FAIL,
            payload: { task, error: serializeError(error) }
        });
    }
};

export const createSubtask = (task) => async function(dispatch, getState) {
    dispatch({ type: actionTypes.CREATE_SUBTASK_PENDING });
    const state = getState();
    const rootItemKey = selectors.getRootItemKey(state);
    const rndDevName = selectors.getRndDevName(state);
    const jiraItem = selectors.getJiraItem(state);
    const url = `${JIRA_API_PATH}/issue/createIssue`;
    const {
        label,
        summary,
        description,
        estimate,
    } = task;
    const originalEstimate = humanizeDuration(estimate, constants.HUMANISER_OPTS);
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
                originalEstimate: originalEstimate === '0s' ? '0' : originalEstimate
            },
            [constants.CUST_FIELD_RND_DEVISION]: {
                value: rndDevName
            }
        }
    };
    try {
        const responseJson = await doRequest(url, 'POST', requestPayload);
        return dispatch({
            type: actionTypes.CREATE_SUBTASK_SUCCESS,
            payload: { task, newItemDetails: responseJson }
        });
    } catch (error) {
        return dispatch({
            type: actionTypes.CREATE_SUBTASK_FAIL,
            payload: { task, error: serializeError(error) }
        });
    }
};

export const syncWithJira = () => async function(dispatch, getState) {
    dispatch({
        type: actionTypes.CLEAR_ERROR
    });
    const state = getState();
    const subtasks = selectors.getSubtasks(state);
    const globalErrorMessage = selectors.getErrorMessageFromJson(state);
    const allSubtasksPromise = Promise.all(compact(map(subtasks, task => {
        const {
            key,
            dirty,
            valid,
        } = task;
        if (globalErrorMessage) return;
        if (!dirty) return;
        if (!valid) return;
        return key ? dispatch(updateSubtask(task)) : dispatch(createSubtask(task));
    })));
    allSubtasksPromise.then(
        () => {
            const state01 = getState();
            const globalErrorMessage01 = selectors.getErrorMessageFromJson(state01);
            dispatch(setSnackbarMessage(
                globalErrorMessage01 || `Changes were successfully synchronized with Jira`
            ));
        }
    );
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

export const updRootItemKey = rootItemKey => async function(dispatch, getState) {
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
