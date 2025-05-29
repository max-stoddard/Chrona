import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Exams from "./Exams";
import AddAvailability from "./AddAvailability";
import SessionFeedback from "./SessionFeedback";
import SpecificSessionFeedback from "./SpecificSessionFeedback";
import RevisionSchedule from "./RevisionSchedule";

const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/exams" element={<Exams />}/>
  <Route path="/add-availability" element={<AddAvailability />}/>
  <Route path="/session-feedback" element={<SessionFeedback />} />
  <Route path="/session-feedback/:id" element={<SpecificSessionFeedback />} />
  <Route path="/revision-schedule" element={<RevisionSchedule />} />
</Routes>
);

export default App;