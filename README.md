# 🗓️ Calendario Eventi React

[![React Version](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 📑 Indice
- [Descrizione Generale](#-descrizione-generale)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Funzionalità Principali](#-funzionalità-principali)
- [Componenti](#-componenti)
- [Tecnologie e Dipendenze](#️-tecnologie-e-dipendenze)
- [Installazione e Setup](#-installazione-e-setup)
- [Utilizzo](#-utilizzo)
- [Performance e Accessibilità](#-performance-e-accessibilità)
- [Note di Sviluppo](#-note-di-sviluppo)

## 🎯 Descrizione Generale
Un'applicazione di calendario interattivo sviluppata con [React](https://react.dev/) che permette agli utenti di gestire eventi con categorie personalizzate e livelli di priorità. Ideale per la gestione personale e professionale degli impegni.

## 📂 Struttura del Progetto
```bash
src/
├── Components/
│   ├── CalendarApp.jsx       # 📱 Componente principale
│   ├── CalendarApp.css       # 🎨 Stili del calendario
│   └── EventComponents/
│       ├── EventForm.jsx     # 📝 Form eventi
│       ├── EventCard.jsx     # 🎴 Card eventi
│       ├── eventConstants.js # ⚙️ Configurazioni
│       └── EventComponents.css
├── App.jsx
├── main.jsx
└── index.css
```

## ⭐ Funzionalità Principali

### 📅 Gestione Calendario
- Visualizzazione calendario mensile con navigazione intuitiva
- Evidenziazione giorno corrente e giorni con eventi
- Sistema drag & drop per spostamento eventi
- Visualizzazioni multiple (mese, settimana, giorno)

### 📋 Gestione Eventi
- CRUD completo degli eventi
- Categorizzazione:
  - 💼 Lavoro
  - 👤 Personale
  - 👨‍👩‍👦 Famiglia
  - ❤️ Salute
  - 🤝 Social
- Priorità:
  - 🔴 Alta
  - 🟡 Media
  - 🔵 Bassa

### 🎨 UI/UX Features
- Design responsive mobile-first
- Tema chiaro/scuro automatico
- Animazioni fluide
- [Boxicons](https://boxicons.com/) per icone vettoriali

## 🧩 Componenti

### CalendarApp.jsx
```jsx
const CalendarApp = () => {
  // ... codice implementativo
}
```

## 🧩 Componenti

### 📱 CalendarApp.jsx
Gestisce la logica principale dell'applicazione e lo stato globale:
- 🔄 Gestione stati applicazione
- 📅 Logica calendario
- 💾 Persistenza dati (localStorage)
- 🎯 Gestione eventi

### 📝 EventForm.jsx
Form validato per la creazione e modifica eventi con:
- 📋 Selezione categoria e priorità
- ⏰ Impostazione data/ora
- ✅ Validazione input real-time
- 🎨 UI/UX responsive

### 🎴 EventCard.jsx
Card evento con:
- 🏷️ Indicatori visuali per categoria/priorità
- 🔄 Opzioni rapide (modifica/elimina)
- 📱 Layout responsive
- 🎨 Animazioni fluide

## 🛠️ Tecnologie e Dipendenze
- [React](https://react.dev/) v18.3
- [Boxicons](https://boxicons.com/) per icone
- [PropTypes](https://www.npmjs.com/package/prop-types) per type checking
- LocalStorage per persistenza dati

## 🚀 Installazione e Setup

```
# Clona il repository
git clone [URL-repository]

# Installa dipendenze
npm install

# Avvia in sviluppo
npm run dev

# Build produzione
npm run build
```

## 📚 Utilizzo

### 📝 Creazione Eventi
1. Click su data desiderata nel calendario
2. Compila il form evento con i dettagli necessari
3. Seleziona categoria e priorità dalle opzioni disponibili
4. Conferma la creazione con il pulsante "Crea Evento"

### ⚙️ Gestione Eventi
- ✏️ **Modifica**: click sull'icona modifica per aggiornare i dettagli
- 🗑️ **Elimina**: click sull'icona elimina per rimuovere l'evento
- 🔄 **Sposta**: utilizza drag & drop per spostare tra le date

### ⚡ Performance e Accessibilità
- 🔄 Ottimizzazione render con [`React.memo`](https://react.dev/reference/react/memo)
- 📦 Lazy loading dei componenti per caricamento ottimizzato
- ♿ [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant per accessibilità
- ⌨️ Supporto tastiera 100% per navigazione completa

### 📝 Note di Sviluppo
- 📦 [Node.js](https://nodejs.org/) ≥ 14.0.0
- 🌐 Testato sui principali browser (Chrome, Firefox, Safari)
- 📱 Approccio mobile-first per design responsive
- 📖 Consulta la [Guida alla Contribuzione](CONTRIBUTING.md)

### 🔗 Links Utili
- 📄 [Licenza MIT](LICENSE.md)
- 📚 [Documentazione API](docs/API.md)
- 💡 [Guida allo Sviluppo](docs/DEVELOPMENT.md)

### 👥 Autore
[Juan Camilo Auriti](https://github.com/auriti-web-design)

---

📖 Per maggiori informazioni, consulta la [documentazione completa](docs/README.md) o [apri una issue](https://github.com/your-repo/issues).

🌟 Se ti piace questo progetto, metti una stella su [GitHub](https://github.com/auriti-web-design/calendar-app)!
