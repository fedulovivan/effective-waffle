
import React, { Component/* , PureComponent */ } from 'react';

import { connect } from 'react-redux';

// import Button from 'material-ui/Button';
// import List, { ListItem } from 'material-ui/List';
// import { FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
// import Select from 'material-ui/Select';
// import { MenuItem } from 'material-ui/Menu';
// import Input, { InputLabel } from 'material-ui/Input';
// import IconButton from 'material-ui/IconButton';
// import DeleteIcon from 'material-ui-icons/Delete';
// import moment from 'moment';
// import AddIcon from 'material-ui-icons/Add';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import humanizeDuration from 'humanize-duration';
import { LinearProgress } from 'material-ui/Progress';

// import { PieChart, Pie, /* Sector, */ Cell, Tooltip } from 'recharts';

// import { isNaN } from 'lodash/lang';
// import { map/* , size */ } from 'lodash/collection';
// import { values } from 'lodash/object';
// import { compact } from 'lodash/array';

import './App.css';
import * as actions from './actions';
import * as selectors from './selectors';
// import None from './None';
import General from './General';
import Subtasks from './Subtasks';
import Results from './Results';


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
        //     // foo,
        //     // incFoo,
        //     // decFoo,
        //     // fetchJiraItem,
        //     // addSubtask,
        //     // delSubtask,
        //     // updSubtask,
        //     // labels,
        //     // subtasks,
        //     // totalEstimate,
        //     // dirtyTotalEstimate,
        //     // totalEstimateByLabel,
        //     // // rootItemKey,
        //     // jiraItem,
        //     // // focusFactor,
        //     // error,
        //     // syncWithJira,
        //     // rndDevName,
        //     // isDirty,
        //     // valid,
            isPending,
        //     // user,
        //     // pass,
        //     // hasNew,
        } = this.props;

        return (
            <div>
                <div style={{ height: "5px" }}>
                    {isPending ? <LinearProgress /> : null}
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
