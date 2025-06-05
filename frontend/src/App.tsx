import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/Subjects";
import AddSubjectPage from './pages/AddSubject';
import SubjectDetailsPage from './pages/SubjectDetailsPage';


const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/add-subject" element={<AddSubjectPage />} />
  <Route path="/subjects/:subjectId" element={<SubjectDetailsPage />} />
</Routes>

);

export default App;