import { useState, useEffect } from "react";
import {
  EVENT_CATEGORIES,
  PRIORITY_LEVELS,
  validateTime,
} from "./eventConstants";

/**
 * Componente per la creazione e modifica degli eventi
 * @param {Object} props - Props del componente
 * @param {Function} props.onSubmit - Funzione chiamata alla sottomissione del form
 * @param {Object} props.initialData - Dati iniziali per il form
 * @param {Function} props.onClose - Funzione per chiudere il form
 */
const EventForm = ({ onSubmit, initialData = {}, onClose }) => {
  // Stato del form
  const [eventData, setEventData] = useState({
    category: initialData.category || "work",
    priority: initialData.priority || "medium",
    time: initialData.time || { hours: "00", minutes: "00" },
    text: initialData.text || "",
  });

  // Stato per gli errori di validazione
  const [errors, setErrors] = useState({
    text: "",
    time: "",
  });

  /**
   * Gestisce la sottomissione del form
   * @param {Event} e - Evento submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione
    const validationErrors = {};
    if (!eventData.text.trim()) {
      validationErrors.text = "Il testo è obbligatorio";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Validazione del tempo
    const validatedTime = validateTime(
      eventData.time.hours,
      eventData.time.minutes
    );

    onSubmit({
      ...eventData,
      id: initialData.id || Date.now(),
      date: initialData.date || new Date(),
      time: validatedTime,
    });
  };

  /**
   * Gestisce il cambio della categoria
   * @param {string} category - Nuova categoria selezionata
   */
  const handleCategoryChange = (category) => {
    setEventData((prev) => ({
      ...prev,
      category: category.toLowerCase(),
    }));
  };

  /**
   * Gestisce il cambio della priorità
   * @param {string} priority - Nuova priorità selezionata
   */
  const handlePriorityChange = (priority) => {
    setEventData((prev) => ({
      ...prev,
      priority: priority.toLowerCase(),
    }));
  };

  /**
   * Gestisce il cambio dell'ora
   * @param {Object} e - Evento change
   * @param {string} type - Tipo di input (hours/minutes)
   */
  const handleTimeChange = (e, type) => {
    const value = e.target.value;
    setEventData((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        [type]: value.padStart(2, "0"),
      },
    }));
  };

  // Gestione della chiusura con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="event-form-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div className="event-form">
        <h2 id="form-title" className="event-form-title">
          {initialData.id ? "Modifica Evento" : "Nuovo Evento"}
        </h2>

        <form onSubmit={handleSubmit} className="event-form-content">
          {/* Selettore Categoria */}
          <div className="form-section">
            <label className="form-label">Categoria</label>
            <div className="category-selector">
              {Object.entries(EVENT_CATEGORIES).map(
                ([key, { label, className }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCategoryChange(key)}
                    className={`category-option ${className} ${
                      eventData.category === key.toLowerCase() ? "selected" : ""
                    }`}
                    aria-pressed={eventData.category === key.toLowerCase()}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Selettore Priorità */}
          <div className="form-section">
            <label className="form-label">Priorità</label>
            <div className="priority-selector">
              {Object.entries(PRIORITY_LEVELS).map(
                ([key, { label, icon: Icon, className }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePriorityChange(key)}
                    className={`priority-option ${className} ${
                      eventData.priority === key.toLowerCase() ? "selected" : ""
                    }`}
                    aria-pressed={eventData.priority === key.toLowerCase()}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Input Orario */}
          <div className="form-section">
            <label className="form-label">Orario</label>
            <div className="time-input">
              <input
                type="number"
                min="0"
                max="23"
                value={eventData.time.hours}
                onChange={(e) => handleTimeChange(e, "hours")}
                aria-label="Ore"
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={eventData.time.minutes}
                onChange={(e) => handleTimeChange(e, "minutes")}
                aria-label="Minuti"
              />
              {errors.time && (
                <span className="error-message" role="alert">
                  {errors.time}
                </span>
              )}
            </div>
          </div>

          {/* Textarea Descrizione */}
          <div className="form-section">
            <label className="form-label">Descrizione</label>
            <textarea
              value={eventData.text}
              onChange={(e) => {
                setEventData((prev) => ({ ...prev, text: e.target.value }));
                if (errors.text) setErrors((prev) => ({ ...prev, text: "" }));
              }}
              maxLength={60}
              placeholder="Inserisci una descrizione (max 60 caratteri)"
              className="event-textarea"
              aria-invalid={!!errors.text}
            />
            {errors.text && (
              <span className="error-message" role="alert">
                {errors.text}
              </span>
            )}
          </div>

          {/* Pulsanti */}
          <div className="event-form-buttons">
            <button
              type="button"
              onClick={onClose}
              className="event-form-button secondary"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="event-form-button primary"
              disabled={!eventData.text.trim()}
            >
              {initialData.id ? "Salva Modifiche" : "Crea Evento"}
            </button>
          </div>
        </form>

        {/* Pulsante Chiusura */}
        <button
          onClick={onClose}
          className="close-event-popup"
          aria-label="Chiudi form"
        >
          <i className="bx bx-x" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default EventForm;
