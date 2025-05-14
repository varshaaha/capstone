import React from 'react';

const ProcessedS3Image = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Processed Image</h2>
      <img
        src={imageUrl}
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

export default ProcessedS3Image; 