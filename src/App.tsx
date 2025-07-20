import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PlayerDashboard from './pages/PlayerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateMatch from './pages/CreateMatch';
import JoinMatch from './pages/JoinMatch';
import JoinTournament from './pages/JoinTournament';
import CreateTournament from './pages/CreateTournament';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-ivory-whisper font-poppins">
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/player-dashboard" element={<ProtectedRoute><PlayerDashboard /></ProtectedRoute>} />
              <Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
              <Route path="/create-match" element={<ProtectedRoute><CreateMatch /></ProtectedRoute>} />
              <Route path="/join-match" element={<ProtectedRoute><JoinMatch /></ProtectedRoute>} />
              <Route path="/join-tournament" element={<ProtectedRoute><JoinTournament /></ProtectedRoute>} />
              <Route path="/create-tournament" element={<ProtectedRoute><CreateTournament /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default App;