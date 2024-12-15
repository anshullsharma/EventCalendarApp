// src/components/EventList.js
import React from 'react';

const EventList = ({ events }) => {
    return (
        <div>
            <h3>Events</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        <strong>{event.name}</strong><br />
                        {event.start} - {event.end}<br />
                        {event.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;