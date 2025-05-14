// import React from 'react';
// import Navbar from './components/Navbar';
// import ImageUploader from './components/ImageUploader';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <ImageUploader />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import ImageEnhancement from './pages/ImageEnhancement';
import Pix2Pix from './pages/Pix2Pix';
import Navbar from './components/Navbar';
import ProjectDetails from './pages/ProjectDetails';
import LiteratureSurvey from './pages/LiteratureSurvey';
import HeaderStars from './components/HeaderStars';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="main-header">
          <HeaderStars />
          <h1>GAN-Powered Satellite Detection with Super-Resolution and Data Augmentation</h1>
        </header>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/srgan" element={<ImageEnhancement />} />
            <Route path="/pix2pix" element={<Pix2Pix />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<ProjectDetails />} />
            <Route path="/literature" element={<LiteratureSurvey />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
