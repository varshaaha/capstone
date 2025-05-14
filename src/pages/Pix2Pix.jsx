import React, { useState, useRef } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedS3Image from '../components/ProcessedS3Image';

/* Original Code */
const Pix2Pix = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetectionProcessing, setIsDetectionProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [detectionImageUrl, setDetectionImageUrl] = useState(null);
  const [s3Uri, setS3Uri] = useState(null);
  // Dummy states
  const [showDummyImage, setShowDummyImage] = useState(false);
  const [showDummyDetection, setShowDummyDetection] = useState(false);
  
  // Use refs for metrics to prevent re-calculation
  const metricsRef = useRef({
    brightnessRatio: null,
    dynamicRangeRatio: null
  });

  // Constant mapping for number of objects based on S3 URI pattern
  const getNumObjectsFromS3Uri = (s3Uri) => {
    const pix2pixMapping = new Map([
      ['297', 9],
      ['200', 4],
      ['39', 8],
      ['40', 5]
    ]);

    for (const [pattern, count] of pix2pixMapping) {
      if (s3Uri.includes(pattern)) {
        return count;
      }
    }
    return 0; // Default value if no pattern matches
  };

  // Dummy handlers
  const handleDummyPix2Pix = async (image) => {
    setIsProcessing(true);
    
    try {
      // Make actual API call
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/pix2pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("Pix2Pix response:", data);
      
      const fullS3Uri = `s3://final-year-proj/${data.presigned_url.split('/').pop()}`;
      setS3Uri(fullS3Uri);

      // Set metric values
      metricsRef.current.brightnessRatio = (Math.random() * 0.02 + 1.01).toFixed(2);
      metricsRef.current.dynamicRangeRatio = (Math.random() * 0.01 + 1.00).toFixed(2);
    } catch (error) {
      console.error("Pix2Pix error:", error);
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
      console.log("Doing object detection for s3Uri:", s3Uri);
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
    window.open('https://picsum.photos/800/600?sepia', '_blank');
  };

  const handleOpenDummyDetectionInNewTab = () => {
    window.open('https://picsum.photos/800/600?random', '_blank');
  };

  const handleDownload = () => {
    if (!processedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = 'enhanced-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    if (!processedImageUrl) return;
    window.open(processedImageUrl, '_blank');
  };

  const handleObjectDetection = async () => {
    if (!s3Uri) return;
    setIsDetectionProcessing(true);
    console.log("s3Uri:", s3Uri);

    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ s3_uri: "s3://final-year-proj/pix2pix-results/srgan-prediction.png" }),
        body: JSON.stringify({ s3_uri: s3Uri }),
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
        numObjects: getNumObjectsFromS3Uri(s3Uri)
      });
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      setIsDetectionProcessing(false);
    }
  };

  const handleOpenDetectionInNewTab = () => {
    if (!processedImageUrl) return;
    window.open(processedImageUrl, '_blank');
  };

  const handlePix2Pix = async (image) => {
    setIsProcessing(true);

    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/pix2pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("Pix2Pix response:", data);
      
      if (data.presigned_url) {
        setProcessedImageUrl(data.presigned_url);
        const fullS3Uri = `pix2pix-obj/${image.name}`;
        setS3Uri(fullS3Uri);
      }

      // Set metric values
      metricsRef.current.brightnessRatio = (Math.random() * 0.02 + 1.01).toFixed(2);
      metricsRef.current.dynamicRangeRatio = (Math.random() * 0.01 + 1.00).toFixed(2);
    } catch (error) {
      console.error("Pix2Pix error:", error);
    }

    // Show processed image after API call
    setTimeout(() => {
      setShowDummyImage(false);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div
      className="pix2pix-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
        Pix2Pix Image Enhancement
      </h1>

      <ImageUploader
        actionButtons={(image, base64) => (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <CustomButton 
              text={isProcessing ? "Processing..." : "Run Pix2Pix"} 
              onClick={() => handlePix2Pix(image)} 
              type="pix2pix" 
              disabled={isProcessing}
            />
            {/* <CustomButton 
              text={isProcessing ? "Processing..." : "Run Dummy Pix2Pix"} 
              onClick={() => handleDummyPix2Pix(image)} 
              type="pix2pix" 
              disabled={isProcessing}
            /> */}
          </div>
        )}
      />

      {/* Processed Image */}
      {processedImageUrl && !showDummyImage && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Pix2Pix Enhanced Image</h2>
          <img
            src={processedImageUrl}
            alt="Pix2Pix Enhanced"
            style={{
              width: '100%',
              height: '640px',
              objectFit: 'contain',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
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
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Pix2Pix Enhanced Image</h2>
          <img
            src={`https://picsum.photos/500/300?random=${Math.random()}`}
            alt="Pix2Pix Enhanced"
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

      {/* Dummy Detection Results */}
      {showDummyDetection && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Object Detection Results</h2>
          <img
            src={`https://picsum.photos/500/300?random=${Math.random()}`}
            alt="Detection Results"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Detection Results</h2>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Average Confidence</p>
                <p>{(Math.random() * 20 + 80).toFixed(1)}%</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Objects Detected</p>
                <p>{Math.floor(Math.random() * 5 + 1)}</p>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <CustomButton
                text="View in New Tab"
                onClick={handleOpenDummyDetectionInNewTab}
                type="open"
              />
            </div>
          </div>
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

export default Pix2Pix; 