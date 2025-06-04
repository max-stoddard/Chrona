import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import AddSubjectPage from './pages/AddSubjectPage';

const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/add-subject" element={<AddSubjectPage />} />
</Routes>

);

export default App;