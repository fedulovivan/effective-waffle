import React, { Component } from 'react';
import { connect } from 'react-redux';
import humanizeDuration from 'humanize-duration';
import classNames from 'classnames';

// import Radio, { RadioGroup } from 'material-ui/Radio';
// import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';

import None from './None';
import Drilldown from './Drilldown';

const reduxConnector = connect(
    state => ({
        filteredSubtasks: selectors.getFilteredSubtasks(state),
        subtasks: selectors.getSubtasks(state),
        jiraItem: selectors.getJiraItem(state),
        errorMessage: selectors.getErrorMessageFromJson(state),
        sumForCurrentTTType: selectors.getSumForCurrentTTType(state),
        sumForCurrentTTTypeByLabel: selectors.getSumForCurrentTTTypeByLabel(state),
        isDirty: selectors.isDirty(state),
        isPending: selectors.isPending(state),
        syncWithJiraStats: selectors.getSyncWithJiraStats(state),
        timeTrackingType: selectors.getTimeTrackingType(state),
        focusFactor: selectors.getFocusFactor(state),
        labelFilter: selectors.getLabelFilter(state),
    }),
    dispatch => ({
        syncWithJira: () => dispatch(actions.syncWithJira()),
        updTimeTrackingType: type => dispatch(actions.updTimeTrackingType(type)),
    })
);

class Results extends Component {

    handleTimeTrackingTypeChange = e => {
        this.props.updTimeTrackingType(e.target.value);
    }

    render() {

        const {
            filteredSubtasks,
            jiraItem,
            errorMessage,
            sumForCurrentTTType,
            timeTrackingType,
            focusFactor,
            labelFilter,
            subtasks,
        } = this.props;

        return (
            <div className="column result">
                {
                    errorMessage
                    && (
                        <div>
                            <h3>Error</h3>
                            <p className="red error">{ errorMessage }</p>
                        </div>
                    )
                }
                <div>
                    <h3>Time Statistics</h3>

                    <Select
                        value={timeTrackingType}
                        onChange={this.handleTimeTrackingTypeChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <MenuItem value={constants.TT_TYPE_ESTIMATE}>{constants.TT_TYPE_LABELS[constants.TT_TYPE_ESTIMATE]}</MenuItem>
                        <MenuItem value={constants.TT_TYPE_REMAINING}>{constants.TT_TYPE_LABELS[constants.TT_TYPE_REMAINING]}</MenuItem>
                        <MenuItem value={constants.TT_TYPE_LOGGED}>{constants.TT_TYPE_LABELS[constants.TT_TYPE_LOGGED]}</MenuItem>
                    </Select>

                    <dl className="flexed">
                        <dt>Storypoints</dt>
                        <dd className="important">{(jiraItem && jiraItem.fields[constants.CUST_FIELD_STORY_POINTS]) || <None />}</dd>
                        <dt>{labelFilter === 'all' ? `Total sub-tasks` : `Sub-tasks in category ${labelFilter}`}</dt>
                        <dd className="important">{filteredSubtasks.length}{labelFilter !== 'all' ? `(of ${subtasks.length})` : null}</dd>
                        {
                            timeTrackingType === constants.TT_TYPE_ESTIMATE && (
                                <dt>Dirty estimate (with focus factor)</dt>
                            )
                        }
                        {
                            timeTrackingType === constants.TT_TYPE_ESTIMATE && (
                                <dd className={classNames('123important', { gray: sumForCurrentTTType / focusFactor === 0 })}>
                                    {humanizeDuration(sumForCurrentTTType / focusFactor, constants.HUMANISER_OPTS)}
                                </dd>
                            )
                        }
                        <dt>{constants.TT_TYPE_LABELS[timeTrackingType]}</dt>
                        <dd className={classNames({ gray: sumForCurrentTTType === 0 })}>
                            {humanizeDuration(sumForCurrentTTType, constants.HUMANISER_OPTS)}
                        </dd>
                    </dl>


                    <h3>{constants.TT_TYPE_LABELS[timeTrackingType]} By Category</h3>
                    <Drilldown />

                </div>

            </div>

        );
    }
}

export default reduxConnector(Results);
