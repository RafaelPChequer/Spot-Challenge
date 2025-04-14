import React from 'react';
import PropTypes from 'prop-types';

const CalendarWidget = ({ events }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Calendário</h2>
    {events.map((event, index) => (
      <p key={index} className="text-sm mb-2">
        {event.date}: {event.event}
      </p>
    ))}
  </div>
);

CalendarWidget.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CalendarWidget;
