// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentLogin from './pages/StudentLogin';
import StudentView from './pages/StudentView';

function App() {
  return (
    <BrowserRouter>
      {/* Container principal */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        
        {/* Zona Paginilor */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/student-view" element={<StudentView />} />
          </Routes>
        </div>

        {/* Footer Global */}
        <footer className="app-footer">
          <p>© 2025 Feedback System</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;