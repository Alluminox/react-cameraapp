import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import GeolocationForm from './components/GeolocationForm';

ReactDOM.render(<div>
    <GeolocationForm />

</div>, document.getElementById('root'));
serviceWorker.unregister();
