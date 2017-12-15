
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
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
    }),
    dispatch => ({
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
        fetchStatuses: () => dispatch(actions.fetchStatuses()),
    })
);

class App extends Component {

    componentDidMount() {
        const {
            fetchJiraItem,
            isGeneralValid,
            fetchStatuses,
        } = this.props;
        if (isGeneralValid) {
            fetchJiraItem();
        }
        fetchStatuses();
        // rootItemKey,
        // isDirty,
        // hasNew,
        /* rootItemKey && !isDirty && !hasNew &&  */
    }

    render() {
        const {
            isPending,
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
            </div>
        );
    }
}

export default reduxConnector(App);
