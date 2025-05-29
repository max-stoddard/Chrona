import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressOverview.css';

interface StudyMetric {
  label: string;
  value: string;
  subtext: string;
}

interface SubjectMetric {
  subject: string;
  timeSpent: number;
  performance: number;
}

const ProgressOverview: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data later
  const studyMetrics: StudyMetric[] = [
    { label: 'Total Study Hours', value: '156', subtext: 'hours' },
    { label: 'Average Session Length', value: '1.5', subtext: 'hours/session' },
    { label: 'Subjects Completed', value: '4', subtext: 'of 8' }
  ];

  const subjectMetrics: SubjectMetric[] = [
    { subject: 'Mathematics', timeSpent: 45, performance: 85 },
    { subject: 'Physics', timeSpent: 38, performance: 72 },
    { subject: 'Chemistry', timeSpent: 30, performance: 68 },
    { subject: 'Biology', timeSpent: 25, performance: 90 },
    { subject: 'English', timeSpent: 18, performance: 78 }
  ];

  const maxTime = Math.max(...subjectMetrics.map(m => m.timeSpent));
  const maxPerformance = Math.max(...subjectMetrics.map(m => m.performance));

  return (
    <div className="progress-container">
      <header className="progress-header">
        <div className="header-content">
          <h1 className="section-title">Progress Overview</h1>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Dashboard
          </button>
        </div>
      </header>

      <main>
        {/* Overall Performance Section */}
        <section className="content-section">
          <h2 className="section-title">Overall Performance</h2>
          <div className="metrics-container">
            {studyMetrics.map((metric) => (
              <div key={metric.label} className="metric-box">
                <h3 className="metric-label">{metric.label}</h3>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-subtext">{metric.subtext}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Breakdown Section */}
        <section className="content-section">
          <h2 className="section-title">Subject Breakdown</h2>
          <div className="charts-container">
            {/* Time Spent Chart */}
            <div className="chart-section">
              <h3 className="chart-title">Time Spent (hours)</h3>
              {subjectMetrics.map((metric) => (
                <div key={`time-${metric.subject}`} className="subject-bar">
                  <div className="bar-header">
                    <span>{metric.subject}</span>
                    <span>{metric.timeSpent}h</span>
                  </div>
                  <div className="bar-container">
                    <div
                      className="time-bar"
                      style={{ width: `${(metric.timeSpent / maxTime) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Chart */}
            <div className="chart-section">
              <h3 className="chart-title">Performance (%)</h3>
              {subjectMetrics.map((metric) => (
                <div key={`performance-${metric.subject}`} className="subject-bar">
                  <div className="bar-header">
                    <span>{metric.subject}</span>
                    <span>{metric.performance}%</span>
                  </div>
                  <div className="bar-container">
                    <div
                      className="performance-bar"
                      style={{ width: `${(metric.performance / maxPerformance) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProgressOverview;
