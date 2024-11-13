import { Star, StarHalf, StarOff } from 'lucide-react';

/**
 * Definizione delle categorie degli eventi
 * Ogni categoria ha un id univoco, un'etichetta per l'UI e classi CSS associate
 */
export const EVENT_CATEGORIES = {
    WORK: {
        id: 'work',
        label: 'Lavoro',
        className: 'category-work',
        description: 'Eventi legati al lavoro e impegni professionali'
    },
    PERSONAL: {
        id: 'personal',
        label: 'Personale',
        className: 'category-personal',
        description: 'Eventi personali e tempo libero'
    },
    FAMILY: {
        id: 'family',
        label: 'Famiglia',
        className: 'category-family',
        description: 'Eventi familiari e ricorrenze'
    },
    HEALTH: {
        id: 'health',
        label: 'Salute',
        className: 'category-health',
        description: 'Appuntamenti medici e benessere'
    },
    SOCIAL: {
        id: 'social',
        label: 'Social',
        className: 'category-social',
        description: 'Eventi sociali e incontri'
    }
};

/**
 * Definizione dei livelli di priorità
 * Ogni livello ha un id univoco, un'etichetta, un'icona e classi CSS associate
 */
export const PRIORITY_LEVELS = {
    HIGH: {
        id: 'high',
        label: 'Alta',
        icon: Star,
        className: 'priority-high',
        description: 'Eventi urgenti e importanti'
    },
    MEDIUM: {
        id: 'medium',
        label: 'Media',
        icon: StarHalf,
        className: 'priority-medium',
        description: 'Eventi di media importanza'
    },
    LOW: {
        id: 'low',
        label: 'Bassa',
        icon: StarOff,
        className: 'priority-low',
        description: 'Eventi non urgenti'
    }
};

/**
 * Recupera i dettagli di una categoria dal suo ID
 * @param {string} categoryId - ID della categoria
 * @returns {Object} Dettagli della categoria o categoria di default (WORK)
 */
export const getCategoryDetails = (categoryId) => {
    const key = Object.keys(EVENT_CATEGORIES).find(
        key => EVENT_CATEGORIES[key].id === categoryId.toLowerCase()
    );
    return key ? EVENT_CATEGORIES[key] : EVENT_CATEGORIES.WORK;
};

/**
 * Recupera i dettagli di una priorità dal suo ID
 * @param {string} priorityId - ID della priorità
 * @returns {Object} Dettagli della priorità o priorità di default (MEDIUM)
 */
export const getPriorityDetails = (priorityId) => {
    const key = Object.keys(PRIORITY_LEVELS).find(
        key => PRIORITY_LEVELS[key].id === priorityId.toLowerCase()
    );
    return key ? PRIORITY_LEVELS[key] : PRIORITY_LEVELS.MEDIUM;
};

/**
 * Formatta il tempo dell'evento nel formato HH:MM
 * @param {Object|string} time - Oggetto tempo o stringa
 * @returns {string} Tempo formattato
 */
export const formatEventTime = (time) => {
    if (typeof time === 'string') return time;
    return `${time.hours.padStart(2, '0')}:${time.minutes.padStart(2, '0')}`;
};

/**
 * Formatta una data nel formato localizzato italiano
 * @param {Date} date - Data da formattare
 * @returns {string} Data formattata
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Valida il formato dell'ora
 * @param {string} hours - Ore da validare
 * @param {string} minutes - Minuti da validare
 * @returns {Object} Ora validata
 */
export const validateTime = (hours, minutes) => {
    let validHours = Math.min(Math.max(parseInt(hours) || 0, 0), 23).toString();
    let validMinutes = Math.min(Math.max(parseInt(minutes) || 0, 0), 59).toString();

    return {
        hours: validHours.padStart(2, '0'),
        minutes: validMinutes.padStart(2, '0')
    };
};

/**
 * Ordina gli eventi per data, priorità e ora
 * @param {Array} events - Array di eventi da ordinare
 * @returns {Array} Eventi ordinati
 */
export const sortEvents = (events) => {
    return events.sort((a, b) => {
        // Prima ordina per data
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;

        // Poi per priorità
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityCompare = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityCompare !== 0) return priorityCompare;

        // Infine per ora
        const [aHours, aMinutes] = formatEventTime(a.time).split(':').map(Number);
        const [bHours, bMinutes] = formatEventTime(b.time).split(':').map(Number);
        return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
    });
};