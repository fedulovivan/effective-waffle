import validate from 'validate.js';
// import parseDuration from 'parse-duration';
// import { parse } from 'querystring';
// import moment from 'moment';
import { get, pick } from 'lodash/object';
import { each, sortBy } from 'lodash/collection';
import * as constants from './constants';

export const getAll = state => state;
// export const getFoo = state => getAll(state).foo;
export const getSubtasks = state => {
    const { subtasks } = getAll(state);
    return sortBy(subtasks, 'id');
};
export const getLabels = state => getAll(state).labels;
export const getRootItemKey = state => getAll(state).rootItemKey;
export const getJiraItem = state => getAll(state).jiraItem;
export const getFetchJiraItemPending = state => getAll(state).fetchJiraItemPending;
export const getError = state => getAll(state).error;
export const getFocusFactor = state => getAll(state).focusFactor;
export const getUser = state => getAll(state).user;
export const getPass = state => getAll(state).pass;
export const getLastNewLabel = state => getAll(state).lastNewLabel;
export const getStatuses = state => getAll(state).statuses;

export const getTotalEstimate = state => {
    const subtasks = getSubtasks(state);
    return subtasks.reduce((memo, { estimate }) => {
        // try {
            memo += /* parseDuration */(estimate);
        // } catch (e) {
            // console.error(`cannot parse duration '${estimate}'`, e);
        // }
        return memo;
    }, 0);
};

export const getTotalEstimateByLabel = state => {
    const subtasks = getSubtasks(state);
    // const focusFactor = getFocusFactor(state);
    return subtasks.reduce((memo, { estimate, label }) => {
        if (!memo[label]) memo[label] = 0;
        // try {
            memo[label] += (/* parseDuration */(estimate)/* / focusFactor*/);
        // } catch (e) {
        // console.error(e);
        // }
        return memo;
    }, {});
};

export const getDirtyTotalEstimate = state => {
    const focusFactor = getFocusFactor(state);
    const totalEstimate = getTotalEstimate(state);
    return totalEstimate / focusFactor;
    //const presision = 60 * /*60 **/ 1000; // round to nearest hour (MINUTE)
    //return Math.round(res / presision) * presision;
};

export const getRndDevName = state => {
    const jiraItem = getJiraItem(state);
    return get(jiraItem, `fields.${constants.CUST_FIELD_RND_DEVISION}.value`);
};

export const isDirty = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ dirty }) => dirty);
};

export const hasNew = state => {
    const subtasks = getSubtasks(state);
    return subtasks.some(({ key }) => !key);
};

export const valid = state => true;

export const isPending = state => {
    const {
        fetchJiraItemPending,
        createSubtaskPending,
        updSubtaskPending,
    } = state;
    return fetchJiraItemPending || createSubtaskPending || updSubtaskPending;
};

export const getBasicAuthToken = state => {
    const {
        user, pass,
    } = state;
    return `Basic ${btoa([user, pass].join(':'))}`;
};

export const validateGeneral = state => {
    const stateSlice = pick(
        state,
        ['rootItemKey', 'focusFactor', 'user', 'pass']
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
        user: {
            length: {
                minimum: 3,
            }
        },
        pass: {
            length: {
                minimum: 3,
            }
        }
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
    each(subtasks, ({ dirty, key }) => {
        if (dirty) {
            if (key) {
                toUpdate += 1;
            } else {
                toCreate += 1;
            }
        }
    });
    return { toCreate, toUpdate };
};

//jiraItem.fields[constants.CUST_FIELD_RND_DEVISION].value
// export const getHumanisedTotalEstimate = state => {
//     const totalEstimate = getTotalEstimate(state);
//     const duration = moment.duration(totalEstimate);
// };
