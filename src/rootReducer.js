// import config from 'config';
import humanizeDuration from 'humanize-duration';

import { isNil } from 'lodash/lang';
import { each } from 'lodash/collection';
import * as actionTypes from './actionTypes';
import * as constants from './constants';

const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
        shortEn: {
            //y: () => 'y',
            //mo: () => 'mo',
            w: () => 'w',
            d: () => 'd',
            h: () => 'h',
            m: () => 'm',
            s: () => 's',
            //ms: () => 'ms',
        }
    },
    units: [/*'y', 'mo',*/'w', 'd', 'h', 'm', 's'],
    unitMeasures: {
        //y: 31557600000,
        //mo: 2629800000, // jira 864000000
        w: 144000000, // jira 144000000 normal 604800000
        d: 28800000, // jira 28800000 normal 86400000
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
    }
});
  
// import { debug } from 'util';
// import * as selectors from './selectors';
// console.log(config.get('labels'));
// const LABEL_GUI = 'GUI';
// const LABEL_QA = 'QA';
// const LABEL_DB = 'DB';
// const LABEL_DOC = 'DOC';
// const LABEL_OTHER = 'OTHER';
// const LABEL_DEV = 'DEV';
// const LABEL_IMDB = 'IMDB';
// const LABEL_CORE = 'CORE';

const EMPTY_SUBTASK = {
    // label: constants.LABEL_OTHER,
    summary: '',
    estimate: '1m',
    dirty: false,
};

const isValidLabel = label => constants.LABELS.includes(label);

export const INITIAL_STATE = {
    foo: 1,
    rootItemKey: /* 'LWB-4584' *//* null */"", // hackatonteam2 story
    focusFactor: 0.5,
    labels: constants.LABELS,
    subtaskIdSequence: 100000, // greater than jira ids
    subtasks: [],
    jiraItem: null,
    fetchJiraItemPending: false,
    createSubtaskPending: false,
    updSubtaskPending: false,
    lastNewLabel: constants.LABEL_OTHER,
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
                        ...{ id: subtaskIdSequence },
                        ...{ label: state.lastNewLabel },
                        ...{ dirty: true },
                    }
                ]
            };
        case actionTypes.DEL_SUBTASK: {
            const { id } = payload;
            return {
                ...state,
                subtasks: state.subtasks.filter( task => id !== task.id)
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

            //const origSubtasks = state.subtasks;

            // keep all new as is
            const newStateSubtasks = state.subtasks.filter(({ key, dirty }) => !key || dirty);

            const subtaskExist = (subtasks, keyToSearch) => subtasks.some(({ key }) => key === keyToSearch);

            subtasks.forEach(({ id, key, fields: { summary, description, timeoriginalestimate } }) => {

                if (subtaskExist(newStateSubtasks, key)) return;

                const smatches = summary.match(/^([a-z]{1,5})\s?:\s?(.+)$/i);
                const canExtractLabel = smatches && smatches.length === 3;
                const candidateLabel = canExtractLabel && smatches[1].toUpperCase();
                const isValid = isValidLabel(candidateLabel);

                //EMPTY_SUBTASK

                newStateSubtasks.push({
                    id,
                    label: isValid ? candidateLabel : constants.LABEL_OTHER,
                    summary: canExtractLabel ? smatches[2] : summary,
                    description: isNil(description) ? "" : description,
                    estimate: shortEnglishHumanizer(timeoriginalestimate * 1000, { spacer: '', delimiter: ' ' }),
                    dirty: false,
                    key,
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
        case actionTypes.DISCARD_ALL: {
            return {
                ...state,
                subtasks: []
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
