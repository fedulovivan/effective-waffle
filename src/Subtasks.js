import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import * as selectors from './selectors';
import * as actions from './actions';

import Row from './Row';

const reduxConnector = connect(
    state => ({
        subtasks: selectors.getSubtasks(state),
        labels: selectors.getLabels(state),

    }),
    dispatch => ({
        delSubtask: id => dispatch(actions.delSubtask(id)),
        updSubtask: (id, fields) => dispatch(actions.updSubtask(id, fields)),
    })
);

class Subtasks extends Component {
    render() {
        const {
            subtasks,
            labels,
            delSubtask,
            updSubtask,
        } = this.props;
        return (
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
        );
    }
}

export default reduxConnector(Subtasks);
