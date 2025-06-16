import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import { useGlobalPresence } from './hooks/useGlobalPresence';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects';
import AddSubjectPage from './pages/AddSubject';
import SessionPage from './pages/Session';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import SessionFeedback from './pages/SessionFeedback';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Use the global presence hook for authenticated users
  useGlobalPresence();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return isAuthenticated === null ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/verify-email" element={<VerifyEmail />} />

    {/* Protected routes */}
    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
    <Route path="/add-subject" element={<ProtectedRoute><AddSubjectPage /></ProtectedRoute>} />
    <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
    <Route path="/subjects/:subjectId" element={<ProtectedRoute><SubjectDetailsPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/feedback" element={<ProtectedRoute><SessionFeedback /></ProtectedRoute>} />
    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;