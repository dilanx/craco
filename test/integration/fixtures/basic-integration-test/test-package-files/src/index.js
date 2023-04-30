/* global __CUSTOM_GLOBAL_CONSTANT__ */
import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <h1>Testing CRACO</h1>
      <p id="craco-test">{__CUSTOM_GLOBAL_CONSTANT__}</p>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
