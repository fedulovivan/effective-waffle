
import React, { Component, PureComponent } from 'react';

import { connect } from 'react-redux';

import Button from 'material-ui/Button';
// import List, { ListItem } from 'material-ui/List';
// import { FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
// import Select from 'material-ui/Select';
// import { MenuItem } from 'material-ui/Menu';
// import Input, { InputLabel } from 'material-ui/Input';
// import IconButton from 'material-ui/IconButton';
// import DeleteIcon from 'material-ui-icons/Delete';
// import moment from 'moment';
// import AddIcon from 'material-ui-icons/Add';
import humanizeDuration from 'humanize-duration';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { LinearProgress } from 'material-ui/Progress';

import { PieChart, Pie, /* Sector, */ Cell, Tooltip } from 'recharts';

// import { isNaN } from 'lodash/lang';
import { map/* , size */ } from 'lodash/collection';
// import { values } from 'lodash/object';
// import { compact } from 'lodash/array';

import './App.css';
import * as actions from './actions';
import * as selectors from './selectors';
import * as constants from './constants';
import Row from './Row';
import None from './None';
import General from './General';

const COLORS = [
    '#0088FE',
    '#FF8042',
    '#00C49F',
    '#FFBB28',
];

const reduxConnector = connect(
    state => ({
        foo: selectors.getFoo(state),
        subtasks: selectors.getSubtasks(state),
        labels: selectors.getLabels(state),
        totalEstimate: selectors.getTotalEstimate(state),
        dirtyTotalEstimate: selectors.getDirtyTotalEstimate(state),
        totalEstimateByLabel: selectors.getTotalEstimateByLabel(state),
        rootItemKey: selectors.getRootItemKey(state),
        jiraItem: selectors.getJiraItem(state),
        focusFactor: selectors.getFocusFactor(state),
        error: selectors.getError(state),
        rndDevName: selectors.getRndDevName(state),
        isDirty: selectors.isDirty(state),
        hasNew: selectors.hasNew(state),
        valid: selectors.valid(state),
        isPending: selectors.isPending(state),
        user: selectors.getUser(state),
        pass: selectors.getPass(state),
    }),
    dispatch => ({
        incFoo: () => dispatch(actions.incFoo()),
        decFoo: () => dispatch(actions.decFoo()),
        fetchJiraItem: () => dispatch(actions.fetchJiraItem()),
        addSubtask: () => dispatch(actions.addSubtask()),
        delSubtask: id => dispatch(actions.delSubtask(id)),
        updSubtask: (id, fields) => dispatch(actions.updSubtask(id, fields)),
        syncWithJira: () => dispatch(actions.syncWithJira()),
    })
);

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

class App extends Component {

    componentDidMount() {
        const {
            rootItemKey,
            fetchJiraItem,
            isDirty,
            hasNew,
        } = this.props;
        if (rootItemKey && !isDirty && !hasNew) {
            fetchJiraItem();
        }
    }

    render() {
        const {
            // foo,
            // incFoo,
            // decFoo,
            // fetchJiraItem,
            // addSubtask,
            delSubtask,
            updSubtask,
            labels,
            subtasks,
            totalEstimate,
            dirtyTotalEstimate,
            totalEstimateByLabel,
            // rootItemKey,
            jiraItem,
            // focusFactor,
            error,
            syncWithJira,
            rndDevName,
            isDirty,
            valid,
            isPending,
            // user,
            // pass,
            // hasNew,
        } = this.props;

        const chartData = map(totalEstimateByLabel, (value, name) => {
            return { name, value };
        });

        return (
            <div>
                <div style={{ height: "5px" }}>
                    {isPending ? <LinearProgress /> : null}
                </div>
                <div className="layout">
                    <General />
                    <div className="column">
                        <h3>Subtasks</h3>
                        {subtasks.length ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Summary</TableCell>
                                    <TableCell>Original Estimate</TableCell>
                                    <TableCell>Jira Item</TableCell>
                                    <TableCell>Row Status</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    subtasks.map(task => (
                                        <Row
                                            task={task}
                                            key={task.id}
                                            labels={labels}
                                            delSubtask={delSubtask}
                                            updSubtask={updSubtask}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>) : (<p>Click plus icon to create first subtask</p>)}
                    </div>
                    <div className="column">

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
                                    </dl>
                                </div>
                            )}

                            {error && (
                                <div>
                                    <h3>Error</h3>
                                    <p style={{color: 'red'}}>{ error.message || JSON.stringify(error.jiraErrors) }</p>
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

                                <h3>By Category</h3>
                                <PieChart width={200} height={200}>
                                    <Pie dataKey="value" data={chartData} animationDuration={600}>
                                        {
                                            chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                                        }
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />}/>
                                </PieChart>
                                <Button
                                    raised
                                    color="primary"
                                    onClick={syncWithJira}
                                    disabled={!(!isPending && valid && isDirty && jiraItem && subtasks.length)}
                                >
                                    Save To Jira
                                </Button>
                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default reduxConnector(App);
