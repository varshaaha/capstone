import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ actionButtons }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [base64, setBase64] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPreview(null);
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setBase64(reader.result); //saves base64 string for backend use
            };
            reader.readAsDataURL(file); //this line converts file to Base64
        }

    };

    return (
        <div className="uploader-container">
            <h1>Upload the image here! 📸</h1>
            <div className="upload-box">
                <label htmlFor="upload-input" className="upload-label">
                    {preview ? (
                        <img src={preview} alt="Preview" className="image-preview" />
                    ) : (
                        <span>Click to upload image</span>
                    )}
                </label>
                <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />
            </div>

            {preview && actionButtons && (
                <div className="button-group">
                    {actionButtons(image, base64)}
                </div>
            )}

        </div>
    );
};

export default ImageUploader;
