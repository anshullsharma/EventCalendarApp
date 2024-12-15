// src/components/EventModal.js
import React, { useState } from 'react';

const EventModal = ({ date, onClose, onAddEvent, existingEvents }) => {
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newEvent = {
            name: eventName,
            start: startTime,
            end: endTime,
            description,
            date: date.toISOString().split('T')[0],
        };

        const conflict = existingEvents.some(event => (newEvent.start < event.end && newEvent.end > event.start));
        
        if (conflict) {
            alert('Event time overlaps with an existing event.');
            return;
        }

        onAddEvent(newEvent);
        setEventName('');
        setStartTime('');
        setEndTime('');
        setDescription('');
    };

    return (
        <div className="modal">
            <h2>Add Event for {date.toDateString()}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Event</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default EventModal;