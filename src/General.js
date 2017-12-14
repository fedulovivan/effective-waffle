import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash/lang';

import Tooltip from 'material-ui/Tooltip';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui-icons/Refresh';
import AddIcon from 'material-ui-icons/Add';
import DoNotDisturbIcon from 'material-ui-icons/DoNotDisturb';
import SyncIcon from 'material-ui-icons/Sync';

import * as actions from './actions';
import * as selectors from './selectors';

const reduxConnector = connect(
    state => ({
        isDirty: selectors.isDirty(state),
        hasNew: selectors.hasNew(state),
        rootItemKey: selectors.getRootItemKey(state),
        focusFactor: selectors.getFocusFactor(state),
        user: selectors.getUser(state),
        pass: selectors.getPass(state),
        validateGeneral: selectors.validateGeneral(state),
        syncWithJiraStats: selectors.getSyncWithJiraStats(state),
        jiraItem: selectors.getJiraItem(state),
        // isDirty: selectors.isDirty(state),
        
    }),
    dispatch => ({
        updRootItemKey: rootItemKey => dispatch(actions.updRootItemKey(rootItemKey)),
        updFocusFactor: focusFactor => dispatch(actions.updFocusFactor(focusFactor)),
        updUser: val => dispatch(actions.updUser(val)),
        updPass: val => dispatch(actions.updPass(val)),
        addSubtask: () => dispatch(actions.addSubtask()),
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
        discardAll: () => dispatch(actions.discardAll()),
        syncWithJira: () => dispatch(actions.syncWithJira()),
    })
);

class General extends Component {

    handleRootItemKeyChange = (e) => {
        this.props.updRootItemKey(e.target.value);
    }

    handleFocusFactorChange = (e) => {
        this.props.updFocusFactor(e.target.value);
    }

    handleChangeUser = (e) => {
        this.props.updUser(e.target.value);
    }
    handleChangePass = (e) => {
        this.props.updPass(e.target.value);
    }

    render() {
        const {
            isDirty,
            hasNew,
            rootItemKey,
            focusFactor,
            user,
            pass,
            addSubtask,
            fetchJiraItem,
            validateGeneral,
            discardAll,
            syncWithJiraStats,
            syncWithJira,
            jiraItem,
        } = this.props;

        const getHelperText = (validationResults, fieldName) => {
            if (!validationResults) return null;
            const errors = validationResults[fieldName];
            if (!isArray(errors) || errors.length === 0) return null;
            return errors.join(',');
        };
        const isError = (validationResults, fieldName) => {
            if (!validationResults) return false;
            const errors = validationResults[fieldName];
            return isArray(errors) && errors.length > 0;
        };

        const {
            toCreate,
            toUpdate,
        } = syncWithJiraStats;

        return (
            <div className="column general">
                <h3>General params</h3>
                <form>
                    <div className="story">
                        <TextField
                            // disabled={hasNew || isDirty}
                            value={rootItemKey}
                            label="Story"
                            onChange={this.handleRootItemKeyChange}
                            helperText={getHelperText(validateGeneral, 'rootItemKey')}
                            error={isError(validateGeneral, 'rootItemKey')}
                        />
                        <IconButton
                            // disabled={hasNew || isDirty}
                            aria-label="Re-fetch"
                            title="Reload items from jira"
                        >
                            <Refresh onClick={fetchJiraItem} />
                        </IconButton>
                    </div>
                    <TextField
                        value={focusFactor}
                        label="Focus Factor"
                        onChange={this.handleFocusFactorChange}
                        type="number"
                        min="0"
                        max="1"
                        helperText={getHelperText(validateGeneral, 'focusFactor')}
                        error={isError(validateGeneral, 'focusFactor')}
                    />
                    <TextField
                        value={user}
                        label="User"
                        onChange={this.handleChangeUser}
                        helperText={getHelperText(validateGeneral, 'user')}
                        error={isError(validateGeneral, 'user')}
                    />
                    <TextField
                        value={pass}
                        label="Pass"
                        type="password"
                        onChange={this.handleChangePass}
                        helperText={getHelperText(validateGeneral, 'pass')}
                        error={isError(validateGeneral, 'pass')}
                    />
                </form>
                <div className="vertical-buttons action-buttons">
                    <Button
                        raised
                        color="primary"
                        onClick={addSubtask}
                    >
                        <AddIcon /> Add subtask
                    </Button>
                    <Button
                        title="Synchronize local changes with Jira"
                        raised
                        color="primary"
                        onClick={syncWithJira}
                        disabled={!(isDirty)}
                    >
                        {/* {toCreate} to create and {toUpdate} to update */}
                        {/* {toCreate ? `` : null} */}
                        {/* compact( */[
                            <SyncIcon />,
                            toCreate ? `create ${toCreate} item(s)` : null,
                            toUpdate ? `update ${toUpdate} item(s)` : null,
                            !toCreate && !toUpdate ? `Syncronize` : null,
                        ]/* ).join(' and ') */}
                    </Button> 
                    {/* <Tooltip title="foo">                    */}
                    <Button
                        title="Discard all unsaved changes and re-fetch existing subtatsks from jira"
                        raised
                        color="accent"
                        disabled={!hasNew && !isDirty}
                        onClick={discardAll}
                    >
                        <DoNotDisturbIcon /> Start over
                    </Button>
                    {/* </Tooltip> */}
                </div>
            </div>
        );
    }
}

export default reduxConnector(General);
