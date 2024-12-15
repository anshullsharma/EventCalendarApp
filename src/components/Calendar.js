// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(Array.isArray(storedEvents) ? storedEvents : []);
    }, []);

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const addEvent = (event) => {
        const existingEventsForDate = events.filter(e => e.date === event.date);
        const conflict = existingEventsForDate.some(e => (event.start < e.end && event.end > e.start));
        
        if (conflict) {
            alert('Event time overlaps with an existing event.');
            return;
        }

        const newEvents = [...events, event];
        setEvents(newEvents);
        localStorage.setItem('events', JSON.stringify(newEvents));
        setShowModal(false);
    };

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
    };

    const filteredEvents = Array.isArray(events) ? events.filter(event => event.date === selectedDate?.toISOString().split('T')[0]) : [];

    return (
        <div className="calendar">
            <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
            <button onClick={() => changeMonth(-1)}>Previous</button>
            <button onClick={() => changeMonth(1)}>Next</button>
            <div className="calendar-grid">
                {getDaysInMonth().map((date) => (
                    <div
                        key={date}
                        onClick={() => handleDateClick(date)}
                        className={`day ${selectedDate?.toDateString() === date.toDateString() ? 'selected' : ''} ${date.toDateString() === new Date().toDateString() ? 'today' : ''}`}
                    >
                        {date.getDate()}
                    </div>
                ))}
            </div>
            {showModal && (
                <EventModal 
                    date={selectedDate} 
                    onClose={() => setShowModal(false)} 
                    onAddEvent={addEvent} // Pass the addEvent function
                    existingEvents={filteredEvents} 
                />
            )}
        </div>
    );
};

export default Calendar;