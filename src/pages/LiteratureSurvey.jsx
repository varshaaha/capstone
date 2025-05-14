import React from 'react';
import './LiteratureSurvey.css';

const LiteratureSurvey = () => {
  return (
    <div className="literature-container">
      <h1>Literature Survey and Reports</h1>

      <section className="documents">
        <div className="document-card">
          <h2>Literature Survey</h2>
          <p>
            Our comprehensive literature survey covers the latest research in satellite image
            enhancement, GAN-based approaches, and object detection techniques.
          </p>
          <a
            href="YOUR_GOOGLE_DRIVE_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="document-link"
          >
            View Literature Survey
          </a>
        </div>

        <div className="document-card">
          <h2>Capstone Report</h2>
          <p>
            Detailed technical report covering our project implementation, methodology,
            results, and future scope.
          </p>
          <a
            href="https://drive.google.com/file/d/1nMVhbhsHrJxQGwEApAP05LU6xSWbjDdk/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="document-link"
          >
            View Capstone Report
          </a>
        </div>
      </section>
    </div>
  );
};

export default LiteratureSurvey; 