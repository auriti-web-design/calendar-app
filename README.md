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

📖 Per maggiori informazioni, consulta la [documentazione completa](docs/README.md) o [apri una issue](https://github.com/auriti-web-design/calendar-app/issues).

🌟 Se ti piace questo progetto, metti una stella su [GitHub](https://github.com/auriti-web-design/calendar-app)!

___

🗓️ React Event Calendar
=============================

📑 Table of Contents
--------------------

*   [Overview](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-overview)

*   [Project Structure](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-project-structure)

*   [Key Features](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-key-features)

*   [Components](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-components)

*   [Technologies & Dependencies](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#️-technologies--dependencies)

*   [Installation & Setup](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-installation--setup)

*   [Usage](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-usage)

*   [Performance & Accessibility](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-performance--accessibility)

*   [Development Notes](https://app.omnigpt.co/threads/3eeb18af-c9ae-4766-b21a-e03d2bfd516d#-development-notes)


🎯 Overview
-----------

An interactive calendar application built with [React](https://react.dev/) that enables users to manage events with custom categories and priority levels. Perfect for both personal and professional schedule management.

📂 Project Structure
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   src/  ├── Components/  │   ├── CalendarApp.jsx       # 📱 Main component  │   ├── CalendarApp.css       # 🎨 Calendar styles  │   └── EventComponents/  │       ├── EventForm.jsx     # 📝 Event forms  │       ├── EventCard.jsx     # 🎴 Event cards  │       ├── eventConstants.js # ⚙️ Configurations  │       └── EventComponents.css  ├── App.jsx  ├── main.jsx  └── index.css   `

⭐ Key Features
--------------

### 📅 Calendar Management

*   Monthly calendar view with intuitive navigation

*   Current day and events highlight

*   Drag & drop system for event moving

*   Multiple views (month, week, day)


### 📋 Event Management

*   Complete CRUD for events

*   Categories:

    *   💼 Work

    *   👤 Personal

    *   👨‍👩‍👦 Family

    *   ❤️ Health

    *   🤝 Social

*   Priorities:

    *   🔴 High

    *   🟡 Medium

    *   🔵 Low


### 🎨 UI/UX Features

*   Mobile-first responsive design

*   Automatic light/dark theme

*   Smooth animations

*   [Boxicons](https://boxicons.com/) for vector icons


🧩 Components
-------------

### 📱 CalendarApp.jsx

Manages main application logic and global state:

*   🔄 Application state management

*   📅 Calendar logic

*   💾 Data persistence (localStorage)

*   🎯 Event management


### 📝 EventForm.jsx

Validated form for event creation and editing:

*   📋 Category and priority selection

*   ⏰ Date/time setting

*   ✅ Real-time input validation

*   🎨 Responsive UI/UX


### 🎴 EventCard.jsx

Event card featuring:

*   🏷️ Visual indicators for category/priority

*   🔄 Quick options (edit/delete)

*   📱 Responsive layout

*   🎨 Smooth animations


🛠️ Technologies & Dependencies
-------------------------------

*   [React](https://react.dev/) v18.3

*   [Boxicons](https://boxicons.com/) for icons

*   [PropTypes](https://www.npmjs.com/package/prop-types) for type checking

*   LocalStorage for data persistence


🚀 Installation & Setup
-----------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # Clone repository  git clone [repository-URL]  # Install dependencies  npm install  # Start development server  npm run dev  # Production build  npm run build   `

📚 Usage
--------

### 📝 Creating Events

1.  Click desired date on calendar

2.  Fill in event form with details

3.  Select category and priority from available options

4.  Confirm creation with "Create Event" button


### ⚙️ Managing Events

*   ✏️ **Edit**: click edit icon to update details

*   🗑️ **Delete**: click delete icon to remove event

*   🔄 **Move**: use drag & drop to move between dates


### ⚡ Performance & Accessibility

*   🔄 Render optimization with [React.memo](https://react.dev/reference/react/memo)

*   📦 Component lazy loading for optimized loading

*   ♿ [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) compliant

*   ⌨️ 100% keyboard navigation support


### 📝 Development Notes

*   📦 [Node.js](https://nodejs.org/) ≥ 14.0.0

*   🌐 Tested on major browsers (Chrome, Firefox, Safari)

*   📱 Mobile-first approach

*   📖 Check the [Contribution Guide](https://app.omnigpt.co/threads/CONTRIBUTING.md)


### 🔗 Useful Links

*   📄 [MIT License](https://app.omnigpt.co/threads/LICENSE.md)

*   📚 [API Documentation](https://app.omnigpt.co/threads/docs/API.md)

*   💡 [Development Guide](https://app.omnigpt.co/threads/docs/DEVELOPMENT.md)


### 👥 Author

[Juan Camilo Auriti](https://github.com/auriti-web-design)

📖 For more information, check the [complete documentation](https://app.omnigpt.co/threads/docs/README.md) or [open an issue](https://github.com/auriti-web-design/calendar-app/issues).