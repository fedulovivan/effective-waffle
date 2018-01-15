// import { createSelector } from 'reselect';
import validate from 'validate.js';
import { isNil } from 'lodash/lang';
import { get, pick } from 'lodash/object';
import { each, sortBy, map } from 'lodash/collection';

import * as constants from './constants';

export const getAll = state => state;
export const getLabelFilter = state => getAll(state).labelFilter;
export const getSubtasks = state => {
    const { subtasks } = getAll(state);
    return map(sortBy(subtasks, 'id'), task => {
        const errors = validate(
            task,
            {
                summary: {
                    presence: {
                        allowEmpty: false,
                    }
                },
                estimate: {
                    numericality: {
                        greaterThanOrEqualTo: /*1000 * 60 * 5*/0,
                        // message: '^Estimate should be at least 5 minutes',
                    }
                }
            },
            { format: 'flat' }
        );
        return {
            ...task,
            errors,
            valid: isNil(errors) || errors.length === 0
        };
    });
};
export const getFilteredSubtasks = state => {
    const subtasks = getSubtasks(state);
    const labelFilter = getLabelFilter(state);
    if (labelFilter === 'all') return subtasks;
    return subtasks.filter(({ label }) => label === labelFilter);
};
export const getLabels = state => getAll(state).labels;
export const getRootItemKey = state => getAll(state).rootItemKey;
export const getJiraItem = state => getAll(state).jiraItem;
export const getFetchJiraItemPending = state => getAll(state).fetchJiraItemPending;
export const getError = state => getAll(state).error;
export const getFocusFactor = state => getAll(state).focusFactor;
export const getLastNewLabel = state => getAll(state).lastNewLabel;
export const getStatuses = state => getAll(state).statuses;
export const getSnackbarMessage = state => getAll(state).snackbarMessage;

export const getSession = state => getAll(state).session;

export const getTimeTrackingType = state => getAll(state).timeTrackingType;

// export const getMyselfDisplayName = state => {
//     const myself = getMyself(state);
//     return myself ? myself.displayName : null;
// };

// export const noAuth = state => {
//     const error = getError(state);
//     const potential = [
//         `no 'token' or 'token_secret' are available in user session`,
//         `oauth_problem=token_rejected`,
//     ];
//     return error && potential.includes(error.message);
// };

export const getSumForCurrentTTType = state => {
    const subtasks = getFilteredSubtasks(state);
    const timeTrackingType = getTimeTrackingType(state);
    return subtasks.reduce((memo, subtask) => {
        memo += subtask[timeTrackingType];
        return memo;
    }, 0);
};

export const getSumForCurrentTTTypeByLabel = state => {
    const subtasks = getSubtasks(state);
    const timeTrackingType = getTimeTrackingType(state);
    return subtasks.reduce((memo, /*{ estimate, label }*/subtask) => {
        const { label } = subtask;
        if (!memo[label]) memo[label] = 0;
        memo[label] += subtask[timeTrackingType];
        return memo;
    }, {});
};

// export const getDirtyTotalEstimate = state => {
//     const focusFactor = getFocusFactor(state);
//     const totalEstimate = getSumForCurrentTTType(state);
//     return totalEstimate / focusFactor;
// };

export const getRndDevName = state => {
    const jiraItem = getJiraItem(state);
    return get(jiraItem, `fields.${constants.CUST_FIELD_RND_DEVISION}.value`);
};

export const isDirty = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ dirty }) => dirty);
};

export const isInvalid = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ valid }) => !valid);
};

export const hasNew = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ key }) => !key);
};

export const isPending = state => {
    const {
        fetchJiraItemPending,
        createSubtaskPending,
        updSubtaskPending,
        fetchStatusesPending,
        fetchSessionPending,
    } = state;
    return fetchJiraItemPending
        || createSubtaskPending
        || updSubtaskPending
        || fetchStatusesPending
        || fetchSessionPending;
};

export const validateGeneral = state => {
    const stateSlice = pick(
        state,
        ['rootItemKey', 'focusFactor']
    );
    const rules = {
        rootItemKey: {
            format: {
                pattern: /^(lwb|lnk)-\d+$/i,
                message: `^should be LWB-### or LNK-###`,
            },
        },
        focusFactor: {
            numericality: {
                greaterThan: 0,
                lessThan: 1,
            }
        },
    };
    return validate(stateSlice, rules);
};

export const isGeneralValid = state => {
    const validationResult = validateGeneral(state);
    return !validationResult;
};

export const getSyncWithJiraStats = state => {
    const subtasks = getSubtasks(state);
    let toCreate = 0;
    let toUpdate = 0;
    each(subtasks, ({ dirty, key, valid }) => {
        if (valid && dirty) {
            if (key) {
                toUpdate += 1;
            } else {
                toCreate += 1;
            }
        }
    });
    return { toCreate, toUpdate };
};
