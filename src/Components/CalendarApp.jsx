// Importazione dello hook useState da React
import { useState } from "react";

// Definizione del componente funzionale CalendarApp
const CalendarApp = () => {
  // Array dei giorni della settimana in italiano abbreviati
  const daysOfWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  // Array dei mesi dell'anno in italiano
  const monthOfYear = [
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
  ];

  // Inizializzazione dell'oggetto Date per la data corrente
  const currentDate = new Date();

  // Stato per il mese corrente (0-11)
  // Inizializzato con il mese corrente del sistema
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  // Stato per l'anno corrente
  // Inizializzato con l'anno corrente del sistema
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Calcolo del numero di giorni nel mese corrente
  // Usando un trucco con Date(year, month + 1, 0)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Calcolo del giorno della settimana in cui inizia il mese (0-6)
  const firstDaysOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Handler per navigare al mese precedente
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "0", minutes: "00" });
  const [eventText, setEventText] = useState("");

  // Handler per navigare al mese successivo
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    setEvents([...events, newEvent]);

    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
  };

  return (
    // Container principale dell'applicazione
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendario</h1>

        {/* Sezione di navigazione del calendario */}
        <div className="navigate-date">
          <h2 className="month">{monthOfYear[currentMonth]}</h2>{" "}
          <h2 className="year">2024</h2>{" "}
          {/* Hardcoded - dovrebbe usare currentYear */}
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>

        {/* Rendering dei giorni della settimana */}
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        {/* Rendering della griglia dei giorni */}
        <div className="days">
          {/* Rendering degli spazi vuoti prima del primo giorno del mese */}
          {[...Array(firstDaysOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Sezione degli eventi */}
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={(e) =>
                  setEventTime({ ...eventTime, hours: e.target.value })
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              Aggiungi Evento
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {/* Esempio di evento (hardcoded) */}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear} }`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.tex}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit"></i>
              <i className="bx bxs-message-alt-x"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
