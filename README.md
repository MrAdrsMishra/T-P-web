# 🎓 Placement Engine - T-P-Web

A modern, full-featured web application for managing placement activities, coding environments, and interactive dashboards.

---

## 📋 Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Application Flow](#application-flow)
- [Features](#features)

---

## 🌟 Key Features

### 1. **Interactive Code Editor**
- Integrated Monaco Editor and ACE Editor support
- Real-time syntax highlighting
- Multiple language support
- Code execution capabilities

### 2. **Terminal Integration**
- Built-in XTerm terminal emulator
- Execute commands directly from the browser
- Terminal resize and fit functionality
- Real-time output streaming

### 3. **Advanced Dashboard**
- Interactive charts and visualizations
- Calendar heatmap for activity tracking
- Real-time data updates
- Responsive grid layout

### 4. **Theme Management**
- Dark/Light mode toggle
- Radix UI theme system integration
- Persistent theme preferences

### 5. **RESTful API Integration**
- Axios-based HTTP client
- Request/response interceptors
- Error handling middleware
- Environment variable configuration

### 6. **Navigation & Routing**
- React Router DOM v7.5.0
- SPA (Single Page Application) architecture
- Nested routing support
- Dynamic route transitions

### 7. **UI Components & Icons**
- Chakra UI component library
- Radix UI themes
- Lucide React icons
- React Icons integration

---

## 💻 Tech Stack

### **Frontend Framework**
- **React** 19.0.0 - UI library
- **React DOM** 19.0.0 - DOM rendering
- **Vite** 6.2.0 - Build tool & dev server

### **UI & Styling**
- **Tailwind CSS** 3.4.17 - Utility-first CSS
- **Chakra UI** 3.16.0 - Component library
- **Radix UI** 3.2.1 - Headless UI components
- **Radix UI Themes** 3.2.1 - Theme system

### **Code Editors**
- **Monaco Editor** 0.52.2 - Advanced code editor
- **Monaco Editor React** 4.7.0 - React wrapper
- **React ACE** 14.0.1 - ACE editor integration

### **Terminal & Shell**
- **XTerm** 5.3.0 - Terminal emulator
- **XTerm Addon Fit** 0.8.0 - Auto-fit functionality

### **State Management**
- **Zustand** 5.0.6 - Lightweight state management

### **Data & Visualization**
- **Recharts** 2.15.3 - Chart library
- **React Calendar Heatmap** 1.10.0 - Activity heatmap
- **Date-fns** 4.1.0 - Date utilities

### **HTTP & Networking**
- **Axios** 1.11.0 - HTTP client
- **Firebase Tools** 14.24.0 - Firebase integration
- **Proxy** 2.2.0 - Proxy utility

### **Utilities**
- **React Router DOM** 7.5.0 - Client-side routing
- **Next Themes** 0.4.6 - Theme management
- **React Tooltip** 5.28.1 - Tooltip component
- **Radix UI Icons** 1.3.2 - Icon set
- **Lucide React** 0.511.0 - Icon library
- **React Icons** 5.5.0 - Icon collection
- **Dotenv** 17.2.3 - Environment variables

### **Dev Tools**
- **Vite** 6.2.0 - Build & dev server
- **ESLint** 9.21.0 - Code linting
- **PostCSS** 8.5.3 - CSS processing
- **Autoprefixer** 10.4.21 - CSS vendor prefixes
- **TypeScript** - Type definitions available

---

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MrAdrsMishra/T-P-web.git
   cd T-P-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   VITE_FIREBASE_CONFIG=your_firebase_config
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

7. **Run Linting**
   ```bash
   npm run lint
   # or
   yarn lint
   ```

---

## 🔄 Application Flow

### **1. User Access Flow**
```
User Browser
    ↓
Vite Dev Server (Port 5173)
    ↓
React Application Initialization
    ↓
Theme Provider (Next Themes)
    ↓
Router Provider (React Router)
    ↓
Main Application Layout
```

### **2. Component Architecture**
```
App Root
├── Theme Provider
├── Router Container
│   ├── Layout Component
│   │   ├── Navigation Bar
│   │   ├── Sidebar
│   │   └── Main Content Area
│   ├── Dashboard Page
│   ├── Code Editor Page
│   ├── Terminal Page
│   └── Settings Page
```

### **3. State Management Flow**
```
Zustand Store
├── Auth State
├── UI State (theme, sidebar toggle)
├── Editor State (code, language)
├── Terminal State (output, history)
└── Dashboard State (charts, data)
```

### **4. API Communication Flow**
```
React Component
    ↓
Axios HTTP Request
    ↓
Backend API
    ↓
Response Processing
    ↓
State Update (Zustand)
    ↓
Component Re-render
```

### **5. Terminal Integration Flow**
```
Terminal Component
    ↓
XTerm Initialization
    ↓
WebSocket Connection
    ↓
Command Execution
    ↓
Output Display
```

### **6. Code Editor Flow**
```
Editor Component
    ↓
Monaco/ACE Editor Init
    ↓
Syntax Highlighting
    ↓
Code Execution Request
    ↓
Results Display
```

---

## ✨ Features

### **📊 Dashboard Features**
- Real-time statistics display
- Interactive charts (Line, Bar, Pie)
- Calendar heatmap showing activity trends
- Performance metrics visualization
- Data export functionality

### **💾 Code Editor Features**
- Multi-language syntax highlighting
- Code completion suggestions
- Error detection and highlighting
- Code formatting
- Split editor view
- Keyboard shortcuts support

### **🖥️ Terminal Features**
- Full bash/shell command support
- Command history navigation
- Copy/paste functionality
- Auto-resize to viewport
- Clear terminal command
- Session persistence

### **🎨 UI/UX Features**
- Responsive design (Mobile, Tablet, Desktop)
- Dark/Light theme toggle
- Smooth animations and transitions
- Intuitive navigation menu
- Modal dialogs for actions
- Toast notifications for feedback
- Accessibility features (ARIA labels)

### **🔐 Security Features**
- Environment variable protection
- CORS-enabled API requests
- Input validation
- XSS protection

### **📱 Responsive Design**
- Mobile-first approach
- Breakpoint support (sm, md, lg, xl)
- Flexible grid system
- Touch-friendly interfaces

### **⚡ Performance Features**
- Code splitting with Vite
- Lazy loading components
- Optimized bundle size
- Fast development server
- Tree-shaking support

### **📡 API Integration**
- RESTful API endpoints
- Error handling middleware
- Request timeout configuration
- Automatic retry logic
- Response caching

### **🎯 Placement-Specific Features**
- Job posting management
- Student profile system
- Interview scheduling
- Result tracking
- Statistics and analytics
- Report generation

---

## 📁 Project Structure

```
T-P-web/
├── src/
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── store/               # Zustand store
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   └── App.jsx
├── public/                  # Static assets
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── eslint.config.js         # ESLint config
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🔧 Configuration Files

- **vite.config.js** - Build and dev server configuration
- **tailwind.config.js** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins (Tailwind, Autoprefixer)
- **eslint.config.js** - Code quality rules
- **.gitignore** - Git ignore patterns

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**MrAdrsMishra**  
GitHub: [@MrAdrsMishra](https://github.com/MrAdrsMishra)

---

## 📞 Support

For support, email your queries or open an issue on GitHub.

---

**Last Updated:** 2026-03-12 17:17:44  
**Version:** 0.0.0