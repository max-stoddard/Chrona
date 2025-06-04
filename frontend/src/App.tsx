import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/Subjects";
import AddSubjectPage from './pages/AddSubject';

const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/add-subject" element={<AddSubjectPage />} />
</Routes>

);

export default App;