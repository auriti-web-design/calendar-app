import { useState } from "react";

const CalendarApp = () => {
  const daysOfWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
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

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");

  // Correzione del calcolo dei giorni iniziali considerando il calendario italiano
  const getFirstDayOfMonth = () => {
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Convertiamo da domenica = 0 a lunedì = 0
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDaysOfMonth = getFirstDayOfMonth();

  // Gestione migliorata della navigazione tra i mesi
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  // Validazione migliorata per l'input del tempo
  const validateTimeInput = (value, type) => {
    const numValue = parseInt(value);
    if (type === "hours") {
      return numValue >= 0 && numValue <= 23 ? value : eventTime.hours;
    }
    return numValue >= 0 && numValue <= 59 ? value : eventTime.minutes;
  };

  const handleTimeChange = (e, type) => {
    const validatedValue = validateTimeInput(e.target.value, type);
    setEventTime((prev) => ({
      ...prev,
      [type]: validatedValue.padStart(2, "0"),
    }));
  };

  const handleDayClick = (day) => {
    // Crea una nuova data per il giorno selezionato
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    // Verifica se la data selezionata è oggi o nel futuro
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate); // Ora setSelectedDate viene utilizzato
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
    } else {
      // Opzionale: feedback per date passate
      alert("Non è possibile aggiungere eventi a date passate");
    }
  };

  // Aggiungi anche questa funzione di utilità
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Gestione migliorata degli eventi
  const handleEventSubmit = () => {
    if (!eventText.trim()) {
      alert("Inserisci un testo per l'evento");
      return;
    }

    const newEvent = {
      id: Date.now(), // Aggiunto ID univoco per gestire meglio modifiche ed eliminazioni
      date: selectedDate,
      time: `${eventTime.hours}:${eventTime.minutes}`,
      text: eventText.trim(),
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
  };

  // Nuova funzione per eliminare un evento
  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendario</h1>

        {/* Sezione di navigazione corretta */}
        <div className="navigate-date">
          <h2 className="month">{monthOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>{" "}
          {/* Correzione dell'anno hardcoded */}
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

        {/* Rendering ottimizzato dei giorni della settimana */}
        <div className="weekdays" role="row">
          {daysOfWeek.map((day) => (
            <span key={day} role="columnheader">
              {day}
            </span>
          ))}
        </div>

        {/* Rendering ottimizzato della griglia dei giorni */}
        <div className="days" role="grid">
          {[...Array(firstDaysOfMonth)].map((_, index) => (
            <span key={`empty-${index}`} className="empty-day" />
          ))}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const isToday =
              day === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear();

            return (
              <span
                key={day}
                className={`day ${isToday ? "current-day" : ""}`}
                onClick={() => handleDayClick(day)}
                role="gridcell"
                tabIndex={0}
                aria-label={`${day} ${monthOfYear[currentMonth]} ${currentYear}`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      {/* Popup eventi migliorato */}
      {showEventPopup && (
        <div className="event-popup" role="dialog" aria-label="Nuovo evento">
          <div className="time-input">
            <label className="event-popup-time">Orario</label>
            <input
              type="number"
              name="hours"
              min={0}
              max={23}
              className="hours"
              value={eventTime.hours}
              onChange={(e) => handleTimeChange(e, "hours")}
              aria-label="Ore"
            />
            <span>:</span>
            <input
              type="number"
              name="minutes"
              min={0}
              max={59}
              className="minutes"
              value={eventTime.minutes}
              onChange={(e) => handleTimeChange(e, "minutes")}
              aria-label="Minuti"
            />
          </div>

          <textarea
            placeholder="Inserisci il testo dell'evento (massimo 60 caratteri)"
            value={eventText}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setEventText(e.target.value);
              }
            }}
            aria-label="Testo evento"
            maxLength={60}
          />

          <div className="popup-buttons">
            <button
              className="event-popup-btn"
              onClick={handleEventSubmit}
              disabled={!eventText.trim()}
            >
              Aggiungi Evento
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
              aria-label="Chiudi"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>
      )}

      {/* Lista eventi corretta */}
      <div className="events" role="list">
        {events.map((event) => (
          <div className="event" key={event.id} role="listitem">
            <div className="event-date-wrapper">
              <div className="event-date">
                {`${
                  monthOfYear[event.date.getMonth()]
                } ${event.date.getDate()}, ${event.date.getFullYear()}`}
              </div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <button
                className="event-button"
                onClick={() => deleteEvent(event.id)}
                aria-label="Elimina evento"
              >
                <i className="bx bxs-message-alt-x"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
