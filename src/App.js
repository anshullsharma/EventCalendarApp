// src/App.js
import React from 'react';
import Calendar from './components/Calendar';
import './App.css'; // Include your styles here

const App = () => {
    return (
        <div className="app">
            <h1>Dynamic Event Calendar</h1>
            <Calendar />
        </div>
    );
};

export default App;