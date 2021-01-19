import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import App from './App';
import banner from './banner.jpg';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <img src="{banner}" class="non-bordered-image" /> <br />
        <div class="bordered">
           <App />
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);