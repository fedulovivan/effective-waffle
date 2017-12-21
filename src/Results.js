import React, { Component } from 'react';
import { connect } from 'react-redux';
import humanizeDuration from 'humanize-duration';
import classNames from 'classnames';

import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';

import None from './None';
import Drilldown from './Drilldown';

const reduxConnector = connect(
    state => ({
        filteredSubtasks: selectors.getFilteredSubtasks(state),
        jiraItem: selectors.getJiraItem(state),
        error: selectors.getError(state),
        totalEstimate: selectors.getTotalEstimate(state),
        dirtyTotalEstimate: selectors.getDirtyTotalEstimate(state),
        totalEstimateByLabel: selectors.getTotalEstimateByLabel(state),
        isDirty: selectors.isDirty(state),
        isPending: selectors.isPending(state),
        syncWithJiraStats: selectors.getSyncWithJiraStats(state),
    }),
    dispatch => ({
        syncWithJira: () => dispatch(actions.syncWithJira()),
    })
);

class Results extends Component {

    render() {
        const {
            filteredSubtasks,
            jiraItem,
            // rndDevName,
            error,
            totalEstimate,
            dirtyTotalEstimate,
        } = this.props;

        return (
            <div className="column result">
                {
                    error
                    && (
                        <div>
                            <h3>Error</h3>
                            <p className="red error">{ error.message || JSON.stringify(error.jiraErrors) }</p>
                        </div>
                    )
                }
                <div>
                    <h3>Statistics</h3>
                    <dl className="flexed">
                        <dt>Total sub-tasks</dt>
                        <dd className="important">{filteredSubtasks.length}</dd>
                        <dt>Dirty estimate (with focus factor)</dt>
                        <dd className={classNames('important', { gray: dirtyTotalEstimate === 0 })}>
                            {humanizeDuration(dirtyTotalEstimate, constants.HUMANISER_OPTS)}
                        </dd>
                        <dt>Storypoints</dt>
                        <dd className="important">{(jiraItem && jiraItem.fields[constants.CUST_FIELD_STORY_POINTS]) || <None />}</dd>
                        <dt>Pure estimate</dt>
                        <dd className={classNames({ gray: totalEstimate === 0 })}>
                            {humanizeDuration(totalEstimate, constants.HUMANISER_OPTS)}
                        </dd>
                    </dl>

                    <h3>Pure Estimate By Category</h3>
                    <Drilldown />

                </div>

            </div>

        );
    }
}

export default reduxConnector(Results);
