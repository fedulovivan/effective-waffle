import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import humanizeDuration from 'humanize-duration';
import { map/* , size */ } from 'lodash/collection';
import { compact } from 'lodash/array';
import classNames from 'classnames';

// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { PieChart, Pie, /* Sector, */ Cell, Tooltip } from 'recharts';
// import Button from 'material-ui/Button';
// import SyncIcon from 'material-ui-icons/Sync';

import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';

import None from './None';

const humaniserOpts = {
    units: [/*'y', 'mo',*/'w', 'd', 'h', 'm', 's'],
    unitMeasures: {
        //y: 31557600000,
        //mo: 2629800000, // jira 864000000
        w: 144000000, // jira 144000000 normal 604800000
        d: 28800000, // jira 28800000 normal 86400000
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
    },
    largest: 4, 
    round: false,
};

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

// const COLORS = [
//     '#0088FE',
//     '#FF8042',
//     '#00C49F',
//     '#FFBB28',
// ];

class CustomTooltip extends PureComponent {
    render() {
        const {
            payload,
        } = this.props;
        return payload && payload[0] ? (
            <div>
                {payload[0].name}: {humanizeDuration(payload[0].value, humaniserOpts)}
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

                {error && (
                    <div>
                        <h3>Error</h3>
                        <p className="red error">{ error.message || JSON.stringify(error.jiraErrors) }</p>
                    </div>
                )}

                <div>
                    <h3>Sub-tasks statistics</h3>
                    <dl className="flexed">
                        <dt>Total sub-tasks</dt>
                        <dd className="important">{subtasks.length}</dd>
                        <dt>Dirty estimate (with focus factor)</dt>
                        <dd className={classNames('important', { gray: dirtyTotalEstimate === 0 })}>{humanizeDuration(dirtyTotalEstimate, humaniserOpts)}</dd>
                        <dt>Pure estimate</dt>
                        <dd className={classNames({ gray: totalEstimate === 0 })}>{humanizeDuration(totalEstimate, humaniserOpts)}</dd>
                    </dl>

                    <h3>Pure Estimate By Category</h3>
                    <div className="pie-chart-container">
                        {chartData.length ? (
                            <PieChart width={200} height={200}>
                                <Pie dataKey="value" data={chartData} animationDuration={600}>
                                    {
                                        chartData.map(({ name }) => <Cell key={name} fill={constants.LABEL_TO_COLOR[name]} />)
                                    }
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        ) : <p className="gray">Add subtasks to see drilldown chart</p>}
                    </div>

                    <h3>Main story details</h3>
                    {jiraItem ? (
                        <dl className="flexed">
                            <dt>Link</dt>
                            <dd><a title="Open item in new tab in Jira" target="_blank" rel="noopener noreferrer" href={`https://jira.danateq.net/browse/${jiraItem.key}`}>{jiraItem.key}</a></dd>
                            <dt>Summary</dt>
                            <dd>{jiraItem.fields.summary}</dd>
                            <dt>Storypoints</dt>
                            <dd>{jiraItem.fields[constants.CUST_FIELD_STORY_POINTS] || <None />}</dd>
                            <dt>R&D Division name</dt>
                            <dd>{rndDevName || <None />}</dd>
                            <dt>Project</dt>
                            <dd>{jiraItem.fields.project.key} ({jiraItem.fields.project.name})</dd>
                        </dl>
                    ) : <p className="red">Jira item with story is not loaded</p>}


                </div>

            </div>

        );
    }
}

export default reduxConnector(Results);

//<h3>Sync subtasks with Jira</h3>
//<div className="vertical-buttons">
//    <Button
//        title="Synchronize local changes with Jira"
//        raised
//        color="primary"
//        onClick={syncWithJira}
//        disabled={!(!isPending && valid && isDirty && jiraItem && subtasks.length)}
//    >
//        {/* {toCreate} to create and {toUpdate} to update */}
//        {/* {toCreate ? `` : null} */}
//        {/* compact( */[
//            <SyncIcon />,
//            toCreate ? `create ${toCreate} item(s)` : null,
//            toUpdate ? `update ${toUpdate} item(s)` : null,
//            !toCreate && !toUpdate ? `Syncronize` : null,
//        ]/* ).join(' and ') */}
//    </Button>
//</div>
