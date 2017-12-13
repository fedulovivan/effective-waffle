import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui-icons/Refresh';

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
    }),
    dispatch => ({
        updRootItemKey: rootItemKey => dispatch(actions.updRootItemKey(rootItemKey)),
        updFocusFactor: focusFactor => dispatch(actions.updFocusFactor(focusFactor)),
        updUser: val => dispatch(actions.updUser(val)),
        updPass: val => dispatch(actions.updPass(val)),
        addSubtask: () => dispatch(actions.addSubtask()),
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
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
        } = this.props;
        return (
            <div className="column">
                <h3>General params</h3>
                <TextField
                    disabled={hasNew || isDirty}
                    value={rootItemKey}
                    label="Story"
                    onChange={this.handleRootItemKeyChange}
                />
                <IconButton
                    disabled={hasNew || isDirty}
                    aria-label="Re-fetch"
                >
                    <Refresh onClick={fetchJiraItem} />
                </IconButton>
                <br />
                <TextField
                    value={focusFactor}
                    label="Focus Factor"
                    onChange={this.handleFocusFactorChange}
                    type="number"
                    min="0"
                    max="1"
                />
                <br />
                <TextField
                    value={user}
                    label="User"
                    onChange={this.handleChangeUser}
                />
                <br />
                <TextField
                    value={pass}
                    label="Pass"
                    type="password"
                    onChange={this.handleChangePass}
                />
                <br />
                <Button fab color="primary" onClick={addSubtask}>
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

export default reduxConnector(General);
