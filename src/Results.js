import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import humanizeDuration from 'humanize-duration';
import { map/* , size */ } from 'lodash/collection';


// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { PieChart, Pie, /* Sector, */ Cell, Tooltip } from 'recharts';
import Button from 'material-ui/Button';

import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';

import None from './None';

const reduxConnector = connect(
    state => ({
        subtasks: selectors.getSubtasks(state),
        jiraItem: selectors.getJiraItem(state),
        rndDevName: selectors.getRndDevName(state),
        error: selectors.getError(state),
        totalEstimate: selectors.getTotalEstimate(state),
        dirtyTotalEstimate: selectors.getDirtyTotalEstimate(state),
        totalEstimateByLabel: selectors.getTotalEstimateByLabel(state),
        isDirty: selectors.isDirty(state),
        valid: selectors.valid(state),
        isPending: selectors.isPending(state),
        syncWithJiraStats: selectors.getSyncWithJiraStats(state),
    }),
    dispatch => ({
        syncWithJira: () => dispatch(actions.syncWithJira()),
    })
);

const COLORS = [
    '#0088FE',
    '#FF8042',
    '#00C49F',
    '#FFBB28',
];

class CustomTooltip extends PureComponent {
    render() {
        const {
            payload,
        } = this.props;
        return payload && payload[0] ? (
            <div>
                {payload[0].name}: {humanizeDuration(payload[0].value)}
            </div>
        ) : null;
    }
}

class Results extends Component {
    render() {
        const {
            subtasks,
            jiraItem,
            rndDevName,
            error,
            totalEstimate,
            dirtyTotalEstimate,
            totalEstimateByLabel,
            syncWithJira,
            isPending,
            valid,
            isDirty,
            syncWithJiraStats,
        } = this.props;

        const chartData = map(totalEstimateByLabel, (value, name) => {
            return { name, value };
        });

        const {
            toCreate,
            toUpdate,
        } = syncWithJiraStats;

        return (
            <div className="column result">

                {jiraItem && (
                    <div>
                        <h3>Story details</h3>
                        <dl>
                            <dt>Link</dt>
                            <dd><a target="_blank" rel="noopener noreferrer" href={`https://jira.danateq.net/browse/${jiraItem.key}`}>{jiraItem.key}</a></dd>
                            <dt>Summary</dt>
                            <dd>{jiraItem.fields.summary}</dd>
                            <dt>Storypoints</dt>
                            <dd>{jiraItem.fields[constants.CUST_FIELD_STORY_POINTS] || <None />}</dd>
                            <dt>R&D Division name</dt>
                            <dd>{rndDevName || <None />}</dd>
                            <dt>Project</dt>
                            <dd>{jiraItem.fields.project.key} ({jiraItem.fields.project.name})</dd>
                        </dl>
                    </div>
                )}

                {error && (
                    <div>
                        <h3>Error</h3>
                        <p style={{ color: 'red' }}>{ error.message || JSON.stringify(error.jiraErrors) }</p>
                    </div>
                )}

                <div>
                    <h3>Subtasks statictics</h3>
                    <dl>
                        <dt>Total subtasks</dt>
                        <dd>{subtasks.length}</dd>
                        <dt>Pure estimate</dt>
                        <dd>{humanizeDuration(totalEstimate)}</dd>
                        <dt>Dirty estimate (with focus factor)</dt>
                        <dd>{humanizeDuration(dirtyTotalEstimate)}</dd>
                    </dl>

                    <h3>Pure By Category</h3>
                    <PieChart width={200} height={200}>
                        <Pie dataKey="value" data={chartData} animationDuration={600}>
                            {
                                chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                    <h3>Sync subtasks with Jira</h3>
                    <div className="vertical-buttons">
                        <Button
                            raised
                            color="primary"
                            onClick={syncWithJira}
                            disabled={!(!isPending && valid && isDirty && jiraItem && subtasks.length)}
                        >
                            {toCreate} to create and {toUpdate} to update
                        </Button>
                    </div>
                </div>

            </div>

        );
    }
}

export default reduxConnector(Results);
