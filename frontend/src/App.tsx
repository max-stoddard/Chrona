import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Exams from "./Exams";

const App = () => (
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/exams" element={<Exams />}/>
</Routes>
);

export default App;