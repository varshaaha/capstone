import React from 'react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  return (
    <div className="project-container">
      <h1 style={{ color: 'white' }}>Project Details</h1>

      <section className="abstract">
        <h2 className="section-header">Abstract</h2>
        <p>
          Satellite imagery plays a crucial role in various fields, but challenges like low resolution
          and atmospheric interference often limit its effectiveness. This project addresses these
          challenges by leveraging Generative Adversarial Networks (GANs) to enhance satellite images.
          We employ a multi-stage approach, integrating Pix2Pix and CycleGAN for initial enhancement,
          followed by SRGAN for super-resolution. Object detection is performed using YOLO and
          Faster R-CNN on the enhanced imagery. The system is deployed on AWS SageMaker with a
          web-based frontend for user interaction, providing a cost-effective solution for generating
          high-quality geospatial data.
        </p>
      </section>

      <section className="objectives">
        <h2 className="section-header">Objectives</h2>
        <ul>
          <li>
            <strong>Image Enhancement:</strong> Develop GAN-based methods to improve satellite image resolution
            and reduce noise, enabling better visualization of fine details like infrastructure and natural features.
          </li>
          <li>
            <strong>Data Preprocessing:</strong> Implement robust preprocessing pipelines including cloud detection,
            radiometric calibration, and noise reduction to prepare images for enhancement.
          </li>
          <li>
            <strong>Weak Object Detection:</strong> Enhance the detection and segmentation of small or weakly
            defined objects in satellite imagery using GAN-generated synthetic data.
          </li>
          <li>
            <strong>Data Augmentation:</strong> Generate synthetic satellite images to augment training datasets,
            addressing the challenge of limited labeled data in machine learning applications.
          </li>
          <li>
            <strong>Performance Evaluation:</strong> Implement comprehensive evaluation metrics including PSNR,
            SSIM, and FID to assess image quality and system performance.
          </li>
        </ul>
      </section>

      <section className="proposed-system">
        <h2 className="section-header">Proposed System</h2>
        <p>
          The proposed system consists of three main components:
        </p>
        <ol>
          <li>
            <strong>Image Enhancement Module:</strong> Utilizes Pix2Pix, CycleGAN, and SRGAN models
            to enhance satellite imagery quality, focusing on resolution improvement and
            detail preservation.
          </li>
          <li>
            <strong>Object Detection Module:</strong> Implements YOLO and Faster R-CNN for accurate
            object detection in enhanced satellite images.
          </li>
          <li>
            <strong>Cloud Integration:</strong> Deployed on AWS SageMaker with API gateway for
            seamless integration with the web-based frontend.
          </li>
        </ol>
      </section>

      <section className="enhancement-approach">
        <h2 className="section-header">Why GANs for Satellite Image Enhancement?</h2>
        
        <div className="advantage-card">
          <h3>Superior Detail Preservation</h3>
          <p>
            Traditional image enhancement techniques often lose important details or introduce artifacts.
            GAN-based approaches can learn to preserve and enhance fine details in satellite imagery
            while maintaining natural appearance.
          </p>
        </div>

        <div className="advantage-card">
          <h3>Adaptive Enhancement</h3>
          <p>
            Unlike traditional methods that apply fixed enhancement rules, our approach learns
            from examples of high-quality satellite images. This allows for adaptive enhancement
            that can handle various types of degradation and atmospheric conditions.
          </p>
        </div>

        <div className="advantage-card">
          <h3>Joint Enhancement and Restoration</h3>
          <p>
            Our approach can simultaneously handle multiple types of image degradation,
            including noise reduction, super-resolution, and contrast enhancement,
            making it more comprehensive than traditional methods.
          </p>
        </div>
      </section>

      <section className="comparison">
        <h2 className="section-header">Advantages Over Traditional Methods</h2>
        
        <div className="comparison-cards-container">
          <div className="comparison-card">
            <h3>Traditional Methods</h3>
            <ul>
              <li>Fixed enhancement rules</li>
              <li>Limited to specific types of degradation</li>
              <li>Often introduce artifacts</li>
              <li>Manual parameter tuning required</li>
            </ul>
          </div>

          <div className="comparison-card">
            <h3>Our Approach</h3>
            <ul>
              <li>Learns from high-quality examples</li>
              <li>Handles multiple types of degradation simultaneously</li>
              <li>Preserves natural image characteristics</li>
              <li>Automatically adapts to different conditions</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails; 