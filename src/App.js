
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import './App.css';
import * as actions from './actions';
import * as selectors from './selectors';
import * as constants from './constants';
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
        fetchSession: () => dispatch(actions.fetchSession()),
        clearSnackbar: () => dispatch(actions.clearSnackbar()),
    })
);

class App extends Component {

    state = {
        snackbarOpen: false,
    };

    componentDidMount() {
        const {
            fetchJiraItem,
            isGeneralValid,
            fetchStatuses,
            fetchSession,
        } = this.props;
        if (isGeneralValid) {
            fetchJiraItem();
        }
        fetchSession();
        fetchStatuses();
    }

    componentWillReceiveProps(nextProps) {
        const notEmptyMessage = !!nextProps.snackbarMessage;
        const messageHaveChanged = this.props.snackbarMessage !== nextProps.snackbarMessage;
        if (notEmptyMessage && messageHaveChanged) {
            this.setState({
                ...this.state,
                snackbarOpen: true,
            });
        }
    }

    handleRequestClose = (event, reason) => {
        this.setState({
            ...this.state,
            snackbarOpen: false,
        });
        this.props.clearSnackbar();
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
                <Snackbar
                    message={snackbarMessage || ''}
                    autoHideDuration={constants.SNACKBAR_MESSAGE_AUTO_HIDE_DURATION}
                    onRequestClose={this.handleRequestClose}
                    open={this.state.snackbarOpen}
                    transitionDuration={600}
                />
            </div>
        );
    }
}

export default reduxConnector(App);
