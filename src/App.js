
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import './App.css';
import * as actions from './actions';
import * as selectors from './selectors';
import General from './General';
import Subtasks from './Subtasks';
import Results from './Results';

const reduxConnector = connect(
    state => ({
        rootItemKey: selectors.getRootItemKey(state),
        isDirty: selectors.isDirty(state),
        hasNew: selectors.hasNew(state),
        isPending: selectors.isPending(state),
        isGeneralValid: selectors.isGeneralValid(state),
        snackbarMessage: selectors.getSnackbarMessage(state),
    }),
    dispatch => ({
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
        fetchStatuses: () => dispatch(actions.fetchStatuses()),
        fetchMyself: () => dispatch(actions.fetchMyself()),
    })
);

class App extends Component {

    componentDidMount() {
        const {
            fetchJiraItem,
            isGeneralValid,
            fetchStatuses,
            fetchMyself,
        } = this.props;
        if (isGeneralValid) {
            fetchJiraItem();
        }
        fetchMyself();
        fetchStatuses();
    }

    render() {

        const {
            isPending,
            snackbarMessage,
        } = this.props;

        return (
            <div className="root">
                <div className="progress-container">
                    {
                        isPending
                        ? <LinearProgress />
                        : null
                    }
                </div>
                <div className="layout">
                    <General />
                    <Subtasks />
                    <Results />
                </div>
                {/* <Snackbar
                    message={<span>{snackbarMessage}</span>}
                    autoHideDuration={300}
                    open
                /> */}
            </div>
        );
    }
}

export default reduxConnector(App);
