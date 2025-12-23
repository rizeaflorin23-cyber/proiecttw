import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentLogin from './pages/StudentLogin'; // <--- NOU
import StudentView from './pages/StudentView';   // <--- NOU

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rute Profesor */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rute Student */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student-view" element={<StudentView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;