import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash/lang';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui-icons/Refresh';
import AddIcon from 'material-ui-icons/Add';
import DoNotDisturbIcon from 'material-ui-icons/DoNotDisturb';
import SaveIcon from 'material-ui-icons/Save';

import { get } from 'lodash/object';

import None from './None';

import * as actions from './actions';
import * as selectors from './selectors';

const reduxConnector = connect(
    state => ({
        isDirty: selectors.isDirty(state),
        hasNew: selectors.hasNew(state),
        rootItemKey: selectors.getRootItemKey(state),
        focusFactor: selectors.getFocusFactor(state),
        // user: selectors.getUser(state),
        // pass: selectors.getPass(state),
        validateGeneral: selectors.validateGeneral(state),
        syncWithJiraStats: selectors.getSyncWithJiraStats(state),
        jiraItem: selectors.getJiraItem(state),
        // noAuth: selectors.noAuth(state),
        rndDevName: selectors.getRndDevName(state),
        session: selectors.getSession(state),
        // myselfDisplayName: selectors.getMyselfDisplayName(state),

    }),
    dispatch => ({
        updRootItemKey: rootItemKey => dispatch(actions.updRootItemKey(rootItemKey)),
        updFocusFactor: focusFactor => dispatch(actions.updFocusFactor(focusFactor)),
        // updUser: val => dispatch(actions.updUser(val)),
        // updPass: val => dispatch(actions.updPass(val)),
        addSubtask: () => dispatch(actions.addSubtask()),
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
        discardAll: () => {
            if (window.confirm(`Please confirm discarding local changes`)) {
                dispatch(actions.discardAll());
            }
        },
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

    // handleChangeUser = (e) => {
    //     this.props.updUser(e.target.value);
    // }
    // handleChangePass = (e) => {
    //     this.props.updPass(e.target.value);
    // }

    render() {
        const {
            isDirty,
            hasNew,
            rootItemKey,
            focusFactor,
            // user,
            // pass,
            addSubtask,
            fetchJiraItem,
            validateGeneral,
            discardAll,
            syncWithJiraStats,
            syncWithJira,
            jiraItem,
            // noAuth,
            rndDevName,
            // myselfDisplayName,
            session,
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

        const displayName = get(session, 'myself.displayName');

        return (
            <div className="column general">
                <h3>General params</h3>
                <form>
                    <div className="story">
                        <TextField
                            disabled={hasNew || isDirty}
                            value={rootItemKey}
                            label="Main Story"
                            onChange={this.handleRootItemKeyChange}
                            helperText={getHelperText(validateGeneral, 'rootItemKey')}
                            error={isError(validateGeneral, 'rootItemKey')}
                        />
                        <IconButton
                            aria-label="Re-fetch"
                            title="Reload items from jira"
                            disabled={hasNew || isDirty}
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
                    {/* <TextField
                        value={user}
                        label="Jira Login"
                        onChange={this.handleChangeUser}
                        helperText={getHelperText(validateGeneral, 'user')}
                        error={isError(validateGeneral, 'user')}
                    />
                    <TextField
                        value={pass}
                        label="Jira Password"
                        type="password"
                        onChange={this.handleChangePass}
                        helperText={getHelperText(validateGeneral, 'pass')}
                        error={isError(validateGeneral, 'pass')}
                    /> */}
                </form>
                <h3>Main story details</h3>
                {jiraItem ? (
                        <dl className="flexed">
                            <dt>Link</dt>
                            <dd><a title="Open item in new tab in Jira" target="_blank" rel="noopener noreferrer" href={`https://jira.pelatro.net/browse/${jiraItem.key}`}>{jiraItem.key}</a></dd>
                            <dt>Summary</dt>
                            <dd>{jiraItem.fields.summary}</dd>
                            <dt>R&D Division name</dt>
                            <dd>{rndDevName || <None />}</dd>
                            <dt>Project</dt>
                            <dd>{jiraItem.fields.project.key}</dd>
                        </dl>
                    ) : <p className="gray text-centered">Jira item with story is not loaded</p>}
                <h3>Jira Session</h3>
                <div className="session text-centered">
                    {
                        displayName
                        ? (
                            <div>
                                { displayName }
                                <br />
                                <a
                                    title="Open special Jira page for managing issued access tokens"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://jira.pelatro.net/plugins/servlet/oauth/users/access-tokens"
                                >
                                    Revoke access to Jira
                                </a>
                            </div>
                        )
                        : (
                            <div>
                                <span className="red">You are not authenticated</span>
                                <br />
                                <a href="/backend/jira-connector/request-permission">
                                    Request Jira for permission
                                </a>
                            </div>
                        )
                    }
                </div>
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
                        disabled={!(jiraItem && (toCreate || toUpdate))}
                    >
                        {[
                            <SaveIcon key="1" />,
                            toCreate ? <span key="2">create {toCreate} item(s)</span> : null,
                            toCreate && toUpdate ? <span key="3"> and </span> : null,
                            toUpdate ? <span key="4">update {toUpdate} item(s)</span> : null,
                            !toCreate && !toUpdate ? <span key="5">Synchronize</span> : null,
                        ]}
                    </Button>
                    <Button
                        title="Discard all unsaved changes and re-fetch existing subtatsks from jira"
                        raised
                        color="accent"
                        disabled={!hasNew && !isDirty}
                        onClick={discardAll}
                    >
                        <DoNotDisturbIcon /> Start over
                    </Button>
                </div>
            </div>
        );
    }
}

export default reduxConnector(General);
