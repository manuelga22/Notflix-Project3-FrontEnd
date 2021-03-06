import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,  Route } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.css';
//import 'materialize-css';
//import MaterialIcon, {colorPalette} from 'material-icons-react';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';
ReactDOM.render(
  
<BrowserRouter>
<Route path="/" component={App}/>
</BrowserRouter>
,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
