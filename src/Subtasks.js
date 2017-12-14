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
        addSubtask: () => dispatch(actions.addSubtask()),
    })
);

class Subtasks extends Component {
    render() {
        const {
            subtasks,
            labels,
            delSubtask,
            updSubtask,
            addSubtask,
        } = this.props;
        return (
            <div className="column subtasks">
                <h3>Subtasks</h3>
                {subtasks.length ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="category">Category</TableCell>
                            <TableCell className="summary-and-description">Summary and Description</TableCell>
                            <TableCell className="original-estimate">Original Estimate</TableCell>
                            <TableCell className="jira-item">Jira Item</TableCell>
                            <TableCell className="row-status">Record Status</TableCell>
                            <TableCell className="actions" />
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
                </Table>) : (<p className="no-one">No subtasks created.<br />Click &laquo;<a href="#" onClick={addSubtask}>add subtask</a>&raquo; to create first one</p>)}
            </div>
        );
    }
}

export default reduxConnector(Subtasks);
