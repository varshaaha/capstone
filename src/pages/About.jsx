import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="project-objective">
        <h2>Project Objective</h2>
        <p>
          Our project aims to enhance satellite imagery using advanced deep learning techniques,
          specifically SRGAN and Pix2Pix, while also providing object detection capabilities
          through YOLO. This integrated approach allows for both image enhancement and
          intelligent object recognition in satellite imagery.
        </p>
      </section>

      <section className="technologies">
        <h2 className="section-header">Technologies Used</h2>
        
        <div className="tech-cards-container">
          <div className="tech-card">
            <h3>SRGAN (Super-Resolution Generative Adversarial Network)</h3>
            <p>
              SRGAN is a deep learning model that can upscale low-resolution images while
              maintaining high-quality details. It uses a generative adversarial network
              to produce realistic high-resolution images from low-resolution inputs.
            </p>
          </div>

          <div className="tech-card">
            <h3>Pix2Pix</h3>
            <p>
              Pix2Pix is a conditional GAN that learns to map input images to output images.
              In our project, it's used to enhance satellite images by learning the mapping
              between low-quality and high-quality image pairs.
            </p>
          </div>

          <div className="tech-card">
            <h3>YOLO (You Only Look Once)</h3>
            <p>
              YOLO is a state-of-the-art object detection system that can identify and
              locate objects in images in real-time. We use it to detect various objects
              in satellite imagery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 