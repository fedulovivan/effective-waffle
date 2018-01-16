import { isNil } from 'lodash/lang';
import { keyBy } from 'lodash/collection';
import * as actionTypes from './actionTypes';
import * as constants from './constants';

const EMPTY_SUBTASK = {
    summary: '',
    estimate: 0,
    dirty: false,
    status: 1, // Open
    focused: false,
};

const isValidLabel = label => constants.LABELS.includes(label);

export const INITIAL_STATE = {
    rootItemKey: '',
    focusFactor: 0.5,
    labels: constants.LABELS,
    subtaskIdSequence: 100000, // greater than jira ids
    subtasks: [],
    jiraItem: null,
    fetchJiraItemPending: false,
    createSubtaskPending: false,
    updSubtaskPending: false,
    fetchStatusesPending: false,
    fetchSessionPending: false,
    updateSessionPending: false,
    lastNewLabel: constants.LABEL_OTHER,
    error: null,
    statuses: {},
    labelFilter: 'all',
    snackbarMessage: null,
    session: null,
    timeTrackingType: constants.TT_TYPE_ESTIMATE,
};

const rootReducer = function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.ADD_SUBTASK:
            const subtaskIdSequence = state.subtaskIdSequence + 1;
            return {
                ...state,
                subtaskIdSequence,
                subtasks: [
                    ...state.subtasks,
                    {
                        ...EMPTY_SUBTASK,
                        ...{
                            id: subtaskIdSequence,
                            label: state.lastNewLabel,
                            dirty: false,
                            focused: true,
                        },
                    }
                ]
            };
        case actionTypes.DEL_SUBTASK: {
            const { id } = payload;
            return {
                ...state,
                subtasks: state.subtasks.filter(task => id !== task.id)
            };
        }
        case actionTypes.UPD_SUBTASK: {
            const { id, fields } = payload;
            return {
                ...state,
                subtasks: state.subtasks.map(task => {
                    return task.id === id
                        ? {
                            ...task,
                            ...fields,
                            ...{ dirty: true },
                        }
                        : task;
                }),
                lastNewLabel: fields.label || state.lastNewLabel,
            };
        }
        case actionTypes.INIT_FROM_JIRA_ITEM: {

            const { rawSubtasks: { issues: subtasks } } = payload;

            // keep all new as is
            const newStateSubtasks = state.subtasks.filter(({ key, dirty }) => !key || dirty);

            const subtaskExist = (subtasks, keyToSearch) => subtasks.some(({ key }) => key === keyToSearch);

            subtasks.forEach(({ id, key, fields: { status: { id: status }, summary, description, timeoriginalestimate, timeestimate, timespent } }) => {

                if (subtaskExist(newStateSubtasks, key)) return;

                const smatches = summary.match(/^([a-z]{1,5})\s?:\s?(.+)$/i);
                const canExtractLabel = smatches && smatches.length === 3;
                const candidateLabel = canExtractLabel && smatches[1].toUpperCase();
                const isValid = isValidLabel(candidateLabel);

                newStateSubtasks.push({
                    ...EMPTY_SUBTASK,
                    ...{
                        id,
                        label: isValid ? candidateLabel : constants.LABEL_OTHER,
                        summary: canExtractLabel ? smatches[2] : summary,
                        description: isNil(description) ? "" : description,
                        [constants.TT_TYPE_ESTIMATE]: timeoriginalestimate * 1000,
                        [constants.TT_TYPE_REMAINING]: timeestimate * 1000,
                        [constants.TT_TYPE_LOGGED]: timespent * 1000,
                        dirty: false,
                        key,
                        status,
                        focused: false,
                    }
                });
            });

            return {
                ...state,
                subtasks: newStateSubtasks
            };
        }
        case actionTypes.FETCH_JIRA_ITEM_PENDING: {
            return {
                ...state,
                fetchJiraItemPending: true,
            };
        }
        case actionTypes.FETCH_JIRA_ITEM_SUCCESS: {
            const { jiraItem } = payload;
            return {
                ...state,
                fetchJiraItemPending: false,
                error: null,
                jiraItem,
            };
        }
        case actionTypes.FETCH_JIRA_ITEM_FAIL: {
            const { error } = payload;
            return {
                ...state,
                fetchJiraItemPending: false,
                jiraItem: null,
                error,
            };
        }
        case actionTypes.CREATE_SUBTASK_PENDING: {
            return {
                ...state,
                createSubtaskPending: true,
            };
        }
        case actionTypes.CREATE_SUBTASK_SUCCESS: {
            const { newItemDetails, task } = payload;
            return {
                ...state,
                createSubtaskPending: false,
                error: null,
                subtasks: state.subtasks.map(item => {
                    return item.id === task.id ? { ...item, ...newItemDetails, dirty: false, focused: false } : item;
                }),
            };
        }
        case actionTypes.CREATE_SUBTASK_FAIL: {
            const { error } = payload;
            return {
                ...state,
                createSubtaskPending: false,
                error,
            };
        }
        case actionTypes.UPD_SUBTASK_PENDING: {
            return {
                ...state,
                updSubtaskPending: true,
            };
        }
        case actionTypes.UPD_SUBTASK_SUCCESS: {
            const { task } = payload;
            return {
                ...state,
                updSubtaskPending: false,
                error: null,
                subtasks: state.subtasks.map(item => {
                    return item.id === task.id ? { ...item, dirty: false, focused: false } : item;
                }),
            };
        }
        case actionTypes.UPD_SUBTASK_FAIL: {
            const { error } = payload;
            return {
                ...state,
                updSubtaskPending: false,
                error,
            };
        }
        case actionTypes.UPD_ROOT_ITEM_KEY: {
            const { rootItemKey } = payload;
            return {
                ...state,
                rootItemKey
            };
        }
        case actionTypes.UPD_FOCUS_FACTOR: {
            const { focusFactor } = payload;
            return {
                ...state,
                focusFactor,
            };
        }
        case actionTypes.CLEAR_ERROR: {
            return {
                ...state,
                error: null,
            };
        }
        case actionTypes.UPD_TIME_TRACKING_TYPE: {
            return {
                ...state,
                timeTrackingType: payload.value,
            };
        }
        case actionTypes.DISCARD_ALL: {
            return {
                ...state,
                subtasks: [],
                labelFilter: 'all',
            };
        }
        case actionTypes.FETCH_STATUSES_PENDING: {
            return {
                ...state,
                fetchStatusesPending: true,
            };
        }
        case actionTypes.FETCH_STATUSES_SUCCESS: {
            const { responseJson: statuses } = payload;
            return {
                ...state,
                fetchStatusesPending: false,
                statuses: keyBy(statuses, 'id'),
            };
        }
        case actionTypes.FETCH_STATUSES_FAIL: {
            const { error } = payload;
            return {
                ...state,
                fetchStatusesPending: false,
                error,
            };
        }
        case actionTypes.FETCH_SUBTASKS_PENDING: {
            return {
                ...state,
                fetchSubtasksPending: true,
            };
        }
        case actionTypes.FETCH_SUBTASKS_SUCCESS: {
            return {
                ...state,
                fetchSubtasksPending: false,
            };
        }
        case actionTypes.FETCH_SUBTASKS_FAIL: {
            const { error } = payload;
            return {
                ...state,
                fetchSubtasksPending: false,
                error,
            };
        }
        case actionTypes.UPD_LABEL_FILTER: {
            return {
                ...state,
                labelFilter: payload.value,
            };
        }
        case actionTypes.CLEAR_LABEL_FILTER: {
            return {
                ...state,
                labelFilter: 'all'
            };
        }
        case actionTypes.FETCH_SESSION_PENDING: {
            return {
                ...state,
                fetchSessionPending: true,
            };
        }
        case actionTypes.FETCH_SESSION_SUCCESS: {
            const { responseJson: session } = payload;
            const { snackbarMessage, ...restSession } = session;
            return {
                ...state,
                fetchSessionPending: false,
                session: restSession,
                snackbarMessage,
            };
        }
        case actionTypes.FETCH_SESSION_FAIL: {
            const { error } = payload;
            return {
                ...state,
                fetchSessionPending: false,
                error,
            };
        }
        case actionTypes.UPDATE_SESSION_PENDING: {
            return {
                ...state,
                updateSessionPending: true
            };
        }
        case actionTypes.UPDATE_SESSION_SUCCESS: {
            return {
                ...state,
                updateSessionPending: false
            };
        }
        case actionTypes.UPDATE_SESSION_FAIL: {
            const { error } = payload;
            return {
                ...state,
                updateSessionPending: false,
                error,
            };
        }
        case actionTypes.CLEAR_SNACKBAR: {
            return {
                ...state,
                snackbarMessage: null,
            };
        }
        case actionTypes.SET_SNACKBAR_MESSAGE: {
            return {
                ...state,
                snackbarMessage: payload.message,
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
