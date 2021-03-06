import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import * as selectors from './selectors';
import * as actions from './actions';
import * as constants from './constants';

import Row from './Row';

const reduxConnector = connect(
    state => ({
        filteredSubtasks: selectors.getFilteredSubtasks(state),
        labels: selectors.getLabels(state),
        jiraItem: selectors.getJiraItem(state),
        statuses: selectors.getStatuses(state),
        labelFilter: selectors.getLabelFilter(state),
        timeTrackingType: selectors.getTimeTrackingType(state),
    }),
    dispatch => ({
        delSubtask: id => dispatch(actions.delSubtask(id)),
        updSubtask: (id, fields) => dispatch(actions.updSubtask(id, fields)),
        addSubtask: e => {
            dispatch(actions.addSubtask());
            e.preventDefault();
        },
    })
);

class Subtasks extends Component {
    render() {
        const {
            filteredSubtasks,
            labels,
            delSubtask,
            updSubtask,
            addSubtask,
            statuses,
            timeTrackingType,
        } = this.props;
        return (
            <div className="column subtasks">
                <h3>
                Sub-tasks
                </h3>
                {
                    filteredSubtasks.length
                    ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="cell category">Category</TableCell>
                                    <TableCell className="cell summary-and-description">{/*Summary and Description*/}</TableCell>
                                    <TableCell className="cell original-estimate">{constants.TT_TYPE_LABELS[timeTrackingType]}</TableCell>
                                    <TableCell className="cell jira-item">Jira Item</TableCell>
                                    <TableCell className="cell row-status">Record Status</TableCell>
                                    <TableCell className="cell jira-status">Jira Status</TableCell>
                                    <TableCell className="cell actions">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredSubtasks.map(task => (
                                        <Row
                                            task={task}
                                            key={task.id}
                                            labels={labels}
                                            statuses={statuses}
                                            delSubtask={delSubtask}
                                            updSubtask={updSubtask}
                                            timeTrackingType={timeTrackingType}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
                    : (
                        <p className="no-one">
                            No subtasks created.<br />
                            Click &laquo;<button className="link" onClick={addSubtask}>add subtask</button>&raquo; to create first one
                        </p>
                    )
                }
            </div>
        );
    }
}

export default reduxConnector(Subtasks);
