import * as actionTypes from './actionTypes';
// import { debug } from 'util';
// import * as selectors from './selectors';

const LABEL_GUI = 'GUI';
const LABEL_QA = 'QA';
const LABEL_DB = 'DB';
const LABEL_DOC = 'DOC';
const LABEL_OTHER = 'OTHER';
const LABEL_DEV = 'DEV';
const LABEL_IMDB = 'IMDB';
const LABEL_CORE = 'CORE';

const EMPTY_SUBTASK = {
    label: LABEL_GUI,
    summary: '',
    estimate: '1m',
    dirty: false,
};

const isValidLabel = label => [
    LABEL_GUI,
    LABEL_QA,
    LABEL_DB,
    LABEL_DOC,
    LABEL_OTHER,
    LABEL_DEV,
    LABEL_IMDB,
    LABEL_CORE,
].includes(label);

export const INITIAL_STATE = {
    foo: 1,
    rootItemKey: /* 'LWB-4584' *//* null */"", // hackatonteam2 story
    focusFactor: 0.5,
    labels: [
        LABEL_GUI,
        LABEL_QA,
        LABEL_DB,
        LABEL_DOC,
        LABEL_OTHER,
        LABEL_DEV,
        LABEL_IMDB,
        LABEL_CORE,
    ],
    subtaskIdSequence: 0,
    subtasks: [],
    jiraItem: null,
    fetchJiraItemPending: false,
    createSubtaskPending: false,
    updSubtaskPending: false,
    error: null,
    user: '',
    pass: '',
};

const rootReducer = function(state/* = INITIAL_STATE*/, action) {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.INC_FOO:
            return {
                ...state,
                foo: state.foo + 1,
            };
        case actionTypes.DEC_FOO:
            return {
                ...state,
                foo: state.foo - 1,
            };
        case actionTypes.ADD_SUBTASK:
            const subtaskIdSequence = state.subtaskIdSequence + 1;
            return {
                ...state,
                subtaskIdSequence,
                subtasks: [
                    ...state.subtasks,
                    {
                        ...EMPTY_SUBTASK,
                        ...{ id: subtaskIdSequence }
                    }
                ]
            };
        case actionTypes.DEL_SUBTASK: {
            const { id } = payload;
            return {
                ...state,
                subtasks: state.subtasks.filter( task => id !== task.id)
            }
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
                            ...{ dirty: true }
                        }
                        : task;
                })
            }
        }
        case actionTypes.INIT_FROM_JIRA_ITEM: {

            const { rawSubtasks: { issues: subtasks } } = payload;

            // //const jiraItem = selectors.getJiraItem(state);
            // const { fields: { subtasks } } = jiraItem;

            return {
                ...state,
                subtasks: subtasks.map(({ id, key, fields: { summary, timeoriginalestimate } }) => {

                    const smatches = summary.match(/^([a-z]{1,5})\s?:\s?(.+)$/i);
                    const canExtractLabel = smatches && smatches.length === 3;
                    const candidateLabel = canExtractLabel && smatches[1].toUpperCase();
                    const isValid = isValidLabel(candidateLabel);

                    return {
                        id,
                        label: isValid ? candidateLabel : LABEL_OTHER,
                        summary: canExtractLabel ? smatches[2]: summary,
                        estimate: `${timeoriginalestimate / 60}m`,
                        dirty: false,
                        key,
                    };
                })
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
                    return item.id === task.id ? { ...item, ...newItemDetails, dirty: false } : item;
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
                    return item.id === task.id ? { ...item, dirty: false } : item;
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
        case actionTypes.UPD_USER: {
            return {
                ...state,
                user: payload.val,
            };
        }
        case actionTypes.UPD_PASS: {
            return {
                ...state,
                pass: payload.val,
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
