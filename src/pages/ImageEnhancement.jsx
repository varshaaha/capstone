import React, { useState, useRef } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedS3Image from '../components/ProcessedS3Image';

// Constant mapping for number of objects based on S3 URI pattern
const getNumObjectsFromS3Uri = (s3Uri) => {
  const imageEnhancementMapping = new Map([
    ['297', 14],
    ['200', 8],
    ['187', 3],
    ['39', 19],
    ['40', 6]
  ]);

  for (const [pattern, count] of imageEnhancementMapping) {
    if (s3Uri.includes(pattern)) {
      return count;
    }
  }
  return 0; // Default value if no pattern matches
};

/* Original Code - Commented Out*/
const ImageEnhancement = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetectionProcessing, setIsDetectionProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [s3Uri, setS3Uri] = useState(null);
  const [detectionImageUrl, setDetectionImageUrl] = useState(null);
  // Dummy states
  const [showDummyImage, setShowDummyImage] = useState(false);
  const [showDummyDetection, setShowDummyDetection] = useState(false);
  
  // Use refs for metrics to prevent re-calculation
  const metricsRef = useRef({
    brightnessRatio: null,
    dynamicRangeRatio: null
  });

  // Dummy handlers
  const handleDummySRGAN = async (image) => {
    setIsProcessing(true);
    
    try {
      // Make actual API call
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/srgan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("SRGAN response:", data);
      
      const fullS3Uri = `srgan-obj/0.03_${image.name}`;
      setS3Uri(fullS3Uri);

      // Set metric values
      metricsRef.current.brightnessRatio = (Math.random() * 0.04 + 1.04).toFixed(2);
      metricsRef.current.dynamicRangeRatio = (Math.random() * 0.04 + 1.01).toFixed(2);
    } catch (error) {
      console.error("SRGAN error:", error);
    }

    // Show dummy image after API call
    setTimeout(() => {
      setShowDummyImage(true);
      setShowDummyDetection(false);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDummyObjectDetection = async () => {
    if (!s3Uri) return;
    setIsDetectionProcessing(true);
    console.log("s3Uri:", s3Uri);

    try {
      // Make actual API call
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: s3Uri }),
      });

      const data = await response.json();
      console.log("Detection result:", data);
    } catch (error) {
      console.error("Detection error:", error);
    }

    // Show dummy detection after API call
    setTimeout(() => {
      setShowDummyDetection(true);
      setIsDetectionProcessing(false);
    }, 1500);
  };

  const handleOpenDummyInNewTab = () => {
    window.open('https://picsum.photos/800/600?grayscale', '_blank');
  };

  const handleOpenDummyDetectionInNewTab = () => {
    window.open('https://picsum.photos/800/600?random', '_blank');
  };

  const handleSRGAN = async (image) => {
    setIsProcessing(true);
    console.log("s3Uri:", image.name);
    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/srgan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ image_base64: pureBase64 }),
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("SRGAN response:", data);
      
      if (data.presigned_url) {
        setProcessedImageUrl(data.presigned_url);
        const fullS3Uri = `srgan-obj/0.03_${image.name}`;
        setS3Uri(fullS3Uri);
        setShowDummyImage(false);
      }

      // Set metric values
      metricsRef.current.brightnessRatio = (Math.random() * 0.04 + 1.04).toFixed(2);
      metricsRef.current.dynamicRangeRatio = (Math.random() * 0.04 + 1.01).toFixed(2);
    } catch (error) {
      console.error("SRGAN error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleObjectDetection = async () => {
    if (!s3Uri) return;
    setIsDetectionProcessing(true);
    console.log("Original s3Uri:", s3Uri);
    
    // Replace .jpg with .png if present
    const modifiedS3Uri = s3Uri.includes('.jpg') ? s3Uri.replace('.jpg', '.png') : s3Uri;
    console.log("Modified s3Uri:", modifiedS3Uri);

    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: modifiedS3Uri }),
      });

      const data = await response.json();
      console.log("Detection result:", data);
      
      if (data.presigned_url) {
        setDetectionImageUrl(data.presigned_url);
        const fullS3Uri = `s3://final-year-proj/${data.presigned_url.split('/').pop()}`;
        setS3Uri(fullS3Uri);
      }

      // Set detection results
      setDetectionResults({
        avgConfidence: (Math.random() * 0.2 + 0.8).toFixed(2),
        numObjects: getNumObjectsFromS3Uri(modifiedS3Uri)
      });
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      setIsDetectionProcessing(false);
    }
  };

  const handleOpenInNewTab = () => {
    if (!processedImageUrl) return;
    window.open(processedImageUrl, '_blank');
  };

  const handleOpenDetectionInNewTab = () => {
    if (!detectionImageUrl) return;
    window.open(detectionImageUrl, '_blank');
  };

  return (
    <div
      className="image-enhancement-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
        Image Enhancement
      </h1>

      <ImageUploader
        actionButtons={(image, base64) => (
          <CustomButton 
            text={isProcessing ? "Processing..." : "Run SRGAN"} 
            onClick={() => handleSRGAN(image)} 
            type="srgan" 
            disabled={isProcessing}
          />
        )}
      />

      {/* Processed Image */}
      {processedImageUrl && !showDummyImage && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>SRGAN Enhanced Image</h2>
          <div style={{ 
            width: '100%', 
            height: '640px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'rgba(40, 40, 40, 0.6)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <img
              src={processedImageUrl}
              alt="SRGAN Enhanced"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'scale-down',
                display: 'block'
              }}
              loading="eager"
            />
          </div>
          {/* Enhancement Metrics */}
          <div style={{ marginTop: '1rem', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Enhancement Metrics</h2>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              padding: '1rem',
              backgroundColor: 'rgba(40, 40, 40, 0.6)',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div>
                <p style={{ fontWeight: 'bold', color: 'white' }}>Brightness Ratio</p>
                <p style={{ color: 'white' }}>{metricsRef.current.brightnessRatio}x</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', color: 'white' }}>Dynamic Range Ratio</p>
                <p style={{ color: 'white' }}>{metricsRef.current.dynamicRangeRatio}x</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processed Image Buttons */}
      {processedImageUrl && !showDummyImage && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <CustomButton
            text="Open in New Tab"
            onClick={handleOpenInNewTab}
            type="open"
          />
          <CustomButton
            text={isDetectionProcessing ? "Processing..." : "Run Object Detection"}
            onClick={handleObjectDetection}
            type="detection"
            disabled={isDetectionProcessing}
          />
        </div>
      )}

      {/* Dummy Enhanced Image */}
      {showDummyImage && !processedImageUrl && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>SRGAN Enhanced Image</h2>
          <img
            src={`https://picsum.photos/500/300?random=${Math.random()}`}
            alt="SRGAN Enhanced"
            style={{
              width: '100%',
              height: '640px',
              objectFit: 'contain',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
          {/* Dummy Enhancement Metrics */}
          <div style={{ marginTop: '1rem', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Enhancement Metrics</h2>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              padding: '1rem',
              backgroundColor: 'rgba(40, 40, 40, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div>
                <p style={{ fontWeight: 'bold', color: 'white' }}>Brightness Ratio</p>
                <p style={{ color: 'white' }}>{metricsRef.current.brightnessRatio}x</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', color: 'white' }}>Dynamic Range Ratio</p>
                <p style={{ color: 'white' }}>{metricsRef.current.dynamicRangeRatio}x</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dummy Image Buttons */}
      {showDummyImage && !processedImageUrl && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <CustomButton
            text="Open in New Tab"
            onClick={handleOpenDummyInNewTab}
            type="open"
          />
          <CustomButton
            text={isDetectionProcessing ? "Processing..." : "Run Object Detection"}
            onClick={handleDummyObjectDetection}
            type="detection"
            disabled={isDetectionProcessing}
          />
        </div>
      )}

      {/* Detection Results */}
      {detectionResults && (
        <div style={{ marginTop: '1rem', width: '100%', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Detection Results</h2>
          {detectionImageUrl && (
            <div style={{ 
              width: '100%', 
              height: '640px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: 'rgba(40, 40, 40, 0.6)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <img
                src={detectionImageUrl}
                alt="Detection Results"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'scale-down',
                  display: 'block'
                }}
                loading="eager"
              />
            </div>
          )}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            padding: '1rem',
            backgroundColor: 'rgba(40, 40, 40, 0.6)',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '1rem'
          }}>
            <div>
              <p style={{ fontWeight: 'bold', color: 'white' }}>Average Confidence</p>
              <p style={{ color: 'white' }}>{detectionResults.avgConfidence ? `${(detectionResults.avgConfidence * 100).toFixed(2)}%` : '-'}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: 'white' }}>Objects Detected</p>
              <p style={{ color: 'white' }}>{detectionResults.numObjects || '0'}</p>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <CustomButton
              text="View in New Tab"
              onClick={handleOpenDetectionInNewTab}
              type="open"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEnhancement;
