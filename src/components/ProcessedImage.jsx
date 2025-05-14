// components/ProcessedImage.jsx
import React from 'react';

const ProcessedImage = ({ src }) => {
  console.log("Image base64 received:", src?.slice(0, 50)); // Should print a portion of the base64 string

  if (!src) {
    console.log("No image data received.");
    return null;
  }

  // const imageSrc = `data:image/png;base64,${src}`; // assuming backend gives pure base64
  const imageSrc = `data:image/jpeg;base64,${src}`;
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Processed Image</h2>
      <img
        src={imageSrc}
        alt="Processed Result"
        style={{
          maxWidth: '500px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default ProcessedImage;
