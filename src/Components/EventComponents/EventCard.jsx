import React from "react";
import PropTypes from "prop-types";
import {
  getCategoryDetails,
  getPriorityDetails,
  formatEventTime,
  formatDate,
} from "./eventConstants";
import { Calendar, Clock, Trash2, Edit2 } from "lucide-react";

/**
 * Componente per la visualizzazione di un singolo evento
 * @param {Object} props - Props del componente
 * @param {Object} props.event - Dati dell'evento da visualizzare
 * @param {Function} props.onDelete - Funzione per l'eliminazione dell'evento
 * @param {Function} props.onEdit - Funzione per la modifica dell'evento
 * @param {boolean} props.isSelected - Indica se l'evento è selezionato
 */
const EventCard = ({ event, onDelete, onEdit, isSelected = false }) => {
  // Recupero dettagli categoria e priorità
  const category = getCategoryDetails(event.category);
  const priority = getPriorityDetails(event.priority);
  const PriorityIcon = priority.icon;

  /**
   * Gestisce la conferma di eliminazione
   * @param {Event} e - Evento click
   */
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      onDelete(event.id);
    }
  };

  /**
   * Gestisce il click per la modifica
   * @param {Event} e - Evento click
   */
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(event);
  };

  return (
    <div
      className={`event ${isSelected ? "selected" : ""}`}
      role="article"
      aria-label={`Evento: ${event.text}`}
    >
      {/* Indicatore categoria */}
      <div
        className={`category-indicator ${category.className}`}
        role="presentation"
        aria-hidden="true"
      />

      <div className="event-content">
        {/* Header con categoria e priorità */}
        <div className="event-header">
          <div className="event-info">
            <span
              className={`category-badge ${category.className}`}
              title={category.description}
            >
              {category.label}
            </span>
            <span
              className={`priority-indicator ${priority.className}`}
              title={priority.description}
            >
              <PriorityIcon
                className="priority-icon"
                aria-hidden="true"
                size={16}
              />
              <span className="priority-label">{priority.label}</span>
            </span>
          </div>

          {/* Bottoni azioni */}
          <div className="event-actions">
            {onEdit && (
              <button
                className="event-button edit"
                onClick={handleEdit}
                aria-label="Modifica evento"
                title="Modifica evento"
              >
                <Edit2 size={16} />
              </button>
            )}
            <button
              className="event-button delete"
              onClick={handleDelete}
              aria-label="Elimina evento"
              title="Elimina evento"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Testo evento */}
        <p className="event-text">{event.text}</p>

        {/* Footer con data e ora */}
        <div className="event-footer">
          <div className="event-datetime">
            <div className="event-date" title="Data evento">
              <Calendar size={16} className="event-icon" aria-hidden="true" />
              <time dateTime={event.date.toISOString()}>
                {formatDate(event.date)}
              </time>
            </div>
            <div className="event-time" title="Orario evento">
              <Clock size={16} className="event-icon" aria-hidden="true" />
              <time>{formatEventTime(event.time)}</time>
            </div>
          </div>
        </div>

        {/* Dettagli aggiuntivi per accessibilità */}
        <div className="sr-only">
          <p>Categoria: {category.label}</p>
          <p>Priorità: {priority.label}</p>
          <p>Data: {formatDate(event.date)}</p>
          <p>Ora: {formatEventTime(event.time)}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Memo del componente per evitare re-render non necessari
 * Rirender solo se cambiano i dati dell'evento o lo stato di selezione
 */
export default React.memo(EventCard, (prevProps, nextProps) => {
  return (
    prevProps.event.id === nextProps.event.id &&
    prevProps.event.text === nextProps.event.text &&
    prevProps.event.category === nextProps.event.category &&
    prevProps.event.priority === nextProps.event.priority &&
    prevProps.isSelected === nextProps.isSelected
  );
});

// PropTypes per una migliore documentazione e validazione delle props
EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    time: PropTypes.shape({
      hours: PropTypes.string.isRequired,
      minutes: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  isSelected: PropTypes.bool,
};
