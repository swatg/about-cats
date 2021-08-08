/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './components/AppLayout';
import './css/essential.css';

function App() {
  return (
    <AppLayout />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
