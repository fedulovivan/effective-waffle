import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash/lang';

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
        validateGeneral: selectors.validateGeneral(state),
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
            validateGeneral,
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

        return (
            <div className="column general">
                <h3>General params</h3>
                <form>
                    <div className="story">
                        <TextField
                            disabled={hasNew || isDirty}
                            value={rootItemKey}
                            label="Story"
                            onChange={this.handleRootItemKeyChange}
                            helperText={getHelperText(validateGeneral, 'rootItemKey')}
                            error={isError(validateGeneral, 'rootItemKey')}
                        />
                        <IconButton
                            disabled={hasNew || isDirty}
                            aria-label="Re-fetch"
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
                <div className="vertical-buttons">
                    <Button
                        raised
                        color="primary"
                        onClick={addSubtask}
                    >
                        Add subtask
                    </Button>
                    <Button
                        raised
                        // color="primary"
                        // onClick={addSubtask}
                    >
                        Discard all
                    </Button>
                </div>
            </div>
        );
    }
}

export default reduxConnector(General);
