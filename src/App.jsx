// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TypingPage from './pages/TypingPage';
import ConfirmPage from './pages/ConfirmPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/typing" />} />
        <Route path="/typing" element={<TypingPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </Router>
  );
}

export default App;