import Navbar from "../components/Navbar";             // NEW
import vector0 from "../assets/plusSign.png";
import "../styles/addsubject.css";

export default function AddSubjectPage() {
  return (
    <div className="add-subject-page">
      <Navbar />  {/* SHARED NAVBAR */}

      <div className="depth-frame-9">
        <div className="depth-frame-10">
          <div className="depth-frame-11">
            <div className="depth-frame-12">
              <div className="text-wrapper-3">Add Subject</div>
            </div>
          </div>

          <div className="depth-frame-13">
            <div className="depth-frame-14">
              <div className="depth-frame-15">
                <div className="text-wrapper-4">Subject Name</div>
              </div>
              <div className="e-g-history-wrapper">
                <div className="e-g-history">e.g. History</div>
              </div>
            </div>
          </div>

          <div className="depth-frame-16">
            <div className="text-wrapper-5">Exams</div>
          </div>

          <div className="depth-frame-17">
            <div className="overlap-wrapper">
              <div className="overlap">
                <div className="overlap-group">
                  <div className="depth-frame-18">
                    <p className="text-wrapper-4">Paper 1 - Spain 16th century</p>
                  </div>
                  <div className="text-wrapper-6">16th May 2025</div>
                </div>
                <div className="depth-frame-19">
                  <div className="text-wrapper-7">Medium</div>
                </div>
              </div>
            </div>
          </div>

          <div className="depth-frame-17">
            <div className="overlap-group-wrapper">
              <div className="overlap-2">
                <div className="overlap-group-2">
                  <div className="depth-frame-18">
                    <div className="text-wrapper-4">Source Paper</div>
                  </div>
                  <div className="text-wrapper-8">21st May 2025</div>
                </div>
                <div className="depth-frame-20">
                  <div className="text-wrapper-7">Hard</div>
                </div>
              </div>
            </div>
          </div>

          <div className="depth-frame-21">
            <div className="depth-frame-22">
              <div className="depth-frame-23">
                <div className="vector-wrapper">
                  <img className="vector" alt="Vector" src={vector0} />
                </div>
              </div>
              <div className="depth-frame-23">
                <div className="text-wrapper-9">Add Exam</div>
              </div>
            </div>
          </div>

          <div className="depth-frame-21">
            <div className="depth-frame-24">
              <div className="depth-frame-23">
                <div className="text-wrapper-10">Save Subject</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
