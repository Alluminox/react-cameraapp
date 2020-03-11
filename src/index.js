import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/todo/todo.component';
import { UserForm } from './Form';

import * as serviceWorker from './serviceWorker';
import GeolocationForm from './components/GeolocationForm';

ReactDOM.render(<div>
    <GeolocationForm />
    <Todo />

</div>, document.getElementById('root'));
serviceWorker.unregister();
