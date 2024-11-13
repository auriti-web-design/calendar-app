import { useState, useEffect, useCallback, useMemo } from "react";
import EventForm from "./EventComponents/EventForm";
import EventCard from "./EventComponents/EventCard";
import { sortEvents } from "./EventComponents/eventConstants";
import "./CalendarApp.css";
import "./EventComponents/EventComponents.css";

/**
 * Componente principale dell'applicazione calendario
 * Gestisce la visualizzazione del calendario e degli eventi
 */
const CalendarApp = () => {
  // Costanti per i giorni e mesi in italiano
  const daysOfWeek = useMemo(
    () => ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    []
  );
  const monthOfYear = useMemo(
    () => [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    []
  );

  // Stati per la gestione del calendario
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Stato per gli eventi con inizializzazione da localStorage
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("calendarEvents");
      if (savedEvents) {
        return JSON.parse(savedEvents).map((event) => ({
          ...event,
          date: new Date(event.date),
          category: event.category || "work",
          priority: event.priority || "medium",
        }));
      }
    } catch (error) {
      console.error("Errore nel caricamento degli eventi:", error);
    }
    return [];
  });

  /**
   * Salva gli eventi nel localStorage quando cambiano
   */
  useEffect(() => {
    try {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    } catch (error) {
      console.error("Errore nel salvataggio degli eventi:", error);
    }
  }, [events]);

  /**
   * Calcola il primo giorno del mese
   * @returns {number} Indice del primo giorno del mese (0-6)
   */
  const getFirstDayOfMonth = useCallback(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  }, [currentMonth, currentYear]);

  /**
   * Calcola il numero di giorni nel mese corrente
   */
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentMonth, currentYear]);

  const firstDaysOfMonth = useMemo(() => {
    return getFirstDayOfMonth();
  }, [getFirstDayOfMonth]);

  /**
   * Gestisce la navigazione al mese precedente
   */
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  /**
   * Gestisce la navigazione al mese successivo
   */
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  /**
   * Verifica se due date sono lo stesso giorno
   */
  const isSameDay = useCallback((date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  /**
   * Gestisce il click su un giorno del calendario
   */
  const handleDayClick = useCallback(
    (day) => {
      const clickedDate = new Date(currentYear, currentMonth, day);
      const today = new Date();

      if (clickedDate >= today || isSameDay(clickedDate, today)) {
        setSelectedDate(clickedDate);
        setShowEventPopup(true);
        setEditingEvent(null);
      } else {
        alert("Non è possibile aggiungere eventi a date passate");
      }
    },
    [currentMonth, currentYear, isSameDay]
  );

  /**
   * Gestisce la creazione o modifica di un evento
   */
  const handleEventSubmit = useCallback(
    (eventData) => {
      setEvents((prev) => {
        if (editingEvent) {
          // Modifica evento esistente
          return prev.map((event) =>
            event.id === editingEvent.id
              ? { ...eventData, date: selectedDate }
              : event
          );
        } else {
          // Crea nuovo evento
          return [...prev, { ...eventData, date: selectedDate }];
        }
      });
      setShowEventPopup(false);
      setEditingEvent(null);
    },
    [editingEvent, selectedDate]
  );

  /**
   * Gestisce l'eliminazione di un evento
   */
  const deleteEvent = useCallback((eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  /**
   * Gestisce l'apertura del form di modifica
   */
  const handleEditEvent = useCallback((event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventPopup(true);
  }, []);

  /**
   * Filtra e ordina gli eventi per la visualizzazione
   */
  const sortedEvents = useMemo(() => {
    return sortEvents(events);
  }, [events]);

  /**
   * Verifica se un giorno ha eventi
   */
  const hasEvents = useCallback(
    (day) => {
      return events.some(
        (event) =>
          event.date.getDate() === day &&
          event.date.getMonth() === currentMonth &&
          event.date.getFullYear() === currentYear
      );
    },
    [events, currentMonth, currentYear]
  );

  return (
    <div className="calendar-app">
      {/* Sezione Calendario */}
      <div className="calendar">
        <h1 className="heading">Calendario</h1>

        <div className="navigate-date">
          <h2 className="month">{monthOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <button
              className="nav-button"
              onClick={prevMonth}
              aria-label="Mese precedente"
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <button
              className="nav-button"
              onClick={nextMonth}
              aria-label="Mese successivo"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Griglia giorni della settimana */}
        <div className="weekdays" role="row">
          {daysOfWeek.map((day) => (
            <span key={day} role="columnheader">
              {day}
            </span>
          ))}
        </div>

        {/* Griglia giorni del mese */}
        <div className="days" role="grid">
          {[...Array(firstDaysOfMonth)].map((_, index) => (
            <span
              key={`empty-${index}`}
              className="empty-day"
              role="gridcell"
            />
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const isToday = isSameDay(
              new Date(currentYear, currentMonth, day),
              new Date()
            );
            const dayHasEvents = hasEvents(day);

            return (
              <span
                key={day}
                onClick={() => handleDayClick(day)}
                className={`${isToday ? "current-day" : ""} ${
                  dayHasEvents ? "has-events" : ""
                }`}
                role="gridcell"
                tabIndex={0}
                aria-label={`${day} ${
                  monthOfYear[currentMonth]
                } ${currentYear}${dayHasEvents ? ", ha eventi" : ""}`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      {/* Sezione Eventi */}
      <div className="events" role="complementary">
        {sortedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={deleteEvent}
            onEdit={handleEditEvent}
          />
        ))}

        {events.length === 0 && (
          <div className="no-events">Non ci sono eventi programmati</div>
        )}
      </div>

      {/* Form Eventi */}
      {showEventPopup && (
        <EventForm
          onSubmit={handleEventSubmit}
          initialData={editingEvent || { date: selectedDate }}
          onClose={() => {
            setShowEventPopup(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default CalendarApp;
