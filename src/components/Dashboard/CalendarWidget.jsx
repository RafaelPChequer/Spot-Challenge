import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const CalendarWidget = ({ events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-4">
            <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-gray-100"
            >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-gray-100"
            >
                <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );

    const renderDays = () => {
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return (
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day, index) => (
                    <div key={index} className="text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const currentDay = new Date(day); // Clone day to avoid mutation
                const formattedDate = format(currentDay, 'yyyy-MM-dd');
                const dayEvents = events.filter((event) =>
                    isSameDay(new Date(event.date), currentDay)
                );
                days.push(
                    <button
                        key={formattedDate}
                        onClick={() => {
                            console.log('Clicked date:', formattedDate); // Debug log
                            setSelectedDate(currentDay);
                        }}
                        className={`p-2 text-sm rounded-lg text-center relative focus:outline-none ${
                            !isSameMonth(currentDay, monthStart)
                                ? 'text-gray-400'
                                : isSameDay(currentDay, selectedDate)
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-800 hover:bg-gray-100'
                        }`}
                        aria-label={`Selecionar ${format(currentDay, 'dd/MM/yyyy')}`}
                    >
                        {format(currentDay, 'd')}
                        {dayEvents.length > 0 && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                        )}
                    </button>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    const renderEvents = () => {
        if (!selectedDate) {
            console.log('No selected date'); // Debug log
            return null;
        }
        const dayEvents = events.filter((event) =>
            isSameDay(new Date(event.date), selectedDate)
        );
        console.log('Rendering events for:', format(selectedDate, 'yyyy-MM-dd'), dayEvents); // Debug log
        return (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden"
            >
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Eventos em {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
                </h3>
                {dayEvents.length === 0 ? (
                    <p className="text-xs text-gray-500">Nenhum evento neste dia.</p>
                ) : (
                    dayEvents.map((event) => (
                        <div key={event.id} className="mb-3 last:mb-0">
                            <p className="text-sm font-medium text-gray-800">{event.event}</p>
                            {event.time && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {event.time}
                                </p>
                            )}
                            {event.location && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {event.location}
                                </p>
                            )}
                            {event.description && (
                                <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                            )}
                        </div>
                    ))
                )}
            </motion.div>
        );
    };

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">Calendário</h2>
            </div>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            <AnimatePresence>{renderEvents()}</AnimatePresence>
        </div>
    );
};

CalendarWidget.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            event: PropTypes.string.isRequired,
            time: PropTypes.string,
            location: PropTypes.string,
            description: PropTypes.string,
        })
    ).isRequired,
};

CalendarWidget.defaultProps = {
    events: [],
};

export default CalendarWidget;