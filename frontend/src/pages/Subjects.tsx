import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ← new
import "../styles/subjectspage.css";       // keep this

export default function SubjectsPage() {
  return (
    <div className="subjects-page">
      <Navbar /> {/* ← replaces old header */}

      <div className="depth-frame-9">
        <div className="depth-frame-10">
          <div className="depth-frame-11">
            <div className="depth-frame-12">
              <div className="depth-frame-13">
                <div className="text-wrapper-3">Subjects</div>
              </div>
              <div className="depth-frame-14" />
            </div>

            <Link to="/add-subject" className="depth-frame-15">
              <div className="depth-frame-16">
                <div className="text-wrapper-4">Add Subject</div>
              </div>
            </Link>
          </div>

          {/* Subject Cards */}
          {[{
            name: "Mathematics",
            exams: "Paper 1, Paper 2 , Applied"
          }, {
            name: "Physics",
            exams: "Paper 1, Paper 2"
          }, {
            name: "Chemistry",
            exams: "Paper 1, Paper 2 , Paper 3"
          }].map((subject, i) => (
            <div className="depth-frame-17" key={i}>
              <div className="depth-frame-18">
                <div className="depth-frame-19">
                  <div className="depth-frame-20">
                    <div className="depth-frame-21">
                      <div className="text-wrapper-5">{subject.name}</div>
                    </div>
                    <p className="text-wrapper-7">Exams: {subject.exams}</p>
                  </div>

                  <div className="depth-frame-22">
                    <div className="depth-frame-23">
                      <div className="text-wrapper-6">View Details</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
