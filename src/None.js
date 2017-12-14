import React, { /* Component, */ PureComponent } from 'react';

import * as constants from './constants';

export default class None extends PureComponent {
    render() {
        return (
            <span className="gray">{constants.NONE}</span>
        );
    }
}
