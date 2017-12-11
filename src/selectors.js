import parseDuration from 'parse-duration';
import { parse } from 'querystring';
import moment from 'moment';
import { get } from 'lodash/object';
import * as constants from './constants';

export const getAll = state => state;
export const getFoo = state => getAll(state).foo;
export const getSubtasks = state => getAll(state).subtasks;
export const getLabels = state => getAll(state).labels;
export const getRootItemKey = state => getAll(state).rootItemKey;
export const getJiraItem = state => getAll(state).jiraItem;
export const getFetchJiraItemPending = state => getAll(state).fetchJiraItemPending;
export const getError = state => getAll(state).error;
export const getFocusFactor = state => getAll(state).focusFactor;
export const getUser = state => getAll(state).user;
export const getPass = state => getAll(state).pass;
export const getTotalEstimate = state => {
    const subtasks = getSubtasks(state);
    return subtasks.reduce((memo, { estimate }) => {
        try {
            memo += parseDuration(estimate);
        } catch(e) {
            console.error(e);
        }
        return memo;
    }, 0);
};
export const getTotalEstimateByLabel = state => {
    const subtasks = getSubtasks(state);
    return subtasks.reduce((memo, { estimate, label }) => {
        if (!memo[label]) memo[label] = 0;
        try {
            memo[label] += parseDuration(estimate);
        } catch(e) {
            console.error(e);
        }
        return memo;
    }, {});
};
export const getDirtyTotalEstimate = state => {
    const focusFactor = getFocusFactor(state);
    const totalEstimate = getTotalEstimate(state);
    const res = totalEstimate / focusFactor;
    const presision = 60 * 60 * 1000; // round to nearest hour
    return Math.round(res / presision) * presision;
}
export const getRndDevName = state => {
    const jiraItem = getJiraItem(state);
    return get(jiraItem, `fields.${constants.CUST_FIELD_RND_DEVISION}.value`);
}
export const isDirty = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ dirty }) => dirty);
}
export const hasNew = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ key }) => !key);
}
export const valid = state => true;
export const isPending = state => {
    const {
        fetchJiraItemPending,
        createSubtaskPending,
        updSubtaskPending,
    } = state;
    return fetchJiraItemPending || createSubtaskPending || updSubtaskPending;
}
export const getBasicAuthToken = state => {
    const {
        user, pass,
    } = state;
    return `Basic ${btoa([user, pass].join(':'))}`;
}

//jiraItem.fields[constants.CUST_FIELD_RND_DEVISION].value
// export const getHumanisedTotalEstimate = state => {
//     const totalEstimate = getTotalEstimate(state);
//     const duration = moment.duration(totalEstimate);
// };