import { Provider } from 'react-redux';
import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import store from './store';

import { unregister } from './registerServiceWorker';
unregister();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();

