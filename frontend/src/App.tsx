import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Exams from "./Exams";
import AddExam from "./AddExam";
import ExamDetails from "./ExamDetails";
import AddAvailability from "./AddAvailability";
import SessionFeedback from "./SessionFeedback";
import SpecificSessionFeedback from "./SpecificSessionFeedback";
import RevisionSchedule from "./RevisionSchedule";
import Availability from "./Availability";
import Settings from "./Settings";
import SubjectsPage from "./pages/SubjectsPage.tsx";
import AddSubjectPage from './pages/AddSubjectPage';
import ProgressOverview from "./ProgressOverview";

const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/add-subject" element={<AddSubjectPage />} />
  <Route path="/exams" element={<Exams />}/>
  <Route path="/exams/:id" element={<ExamDetails />}/>
  <Route path="/add-exam" element={<AddExam />}/>
  <Route path="/availability" element={<Availability />}/>
  <Route path="/add-availability" element={<AddAvailability />}/>
  <Route path="/session-feedback" element={<SessionFeedback />} />
  <Route path="/session-feedback/:id" element={<SpecificSessionFeedback />} />
  <Route path="/revision-schedule" element={<RevisionSchedule />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/progress" element={<ProgressOverview />} />
</Routes>
);

export default App;