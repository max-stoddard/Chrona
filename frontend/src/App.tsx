import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects';
import AddSubjectPage from './pages/AddSubject';
import SessionPage from './pages/Session';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import NOT_IMPLEMENTED from './pages/NotImplemented';
import NotFound from './pages/NotFound';
import SessionFeedback from './pages/SessionFeedback2';

const App = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/subjects" element={<SubjectsPage />} />
    <Route path="/add-subject" element={<AddSubjectPage />} />
    <Route path="/session" element={<SessionPage />} />
    <Route path="/subjects/:subjectId" element={<SubjectDetailsPage />} />
    <Route path="/profile" element={<NOT_IMPLEMENTED />}/>
    <Route path="*" element={<NotFound />} />
    <Route path="/feedback" element={<SessionFeedback />} />
</Routes>
);

export default App;