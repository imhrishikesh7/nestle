import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import Home from './Pages/Home';
import Preloader from './Components/Preloader/Preloader';

function App() {
  // Check if content has already been loaded
  const [isLoaded, setIsLoaded] = useState(
    localStorage.getItem('isLoaded') === 'true'
  );

  // Function to handle content loading
  const loadContent = () => {
    // Your content loading logic here

    // Set isLoaded to true and store it in localStorage
    setIsLoaded(true);
    localStorage.setItem('isLoaded', 'true');
  };

  useEffect(() => {
    // Check if content has already been loaded
    if (!isLoaded) {
      // If not loaded, load content
      loadContent();
    }
  }, [isLoaded]);

  // Render the preloader if content is not loaded
  if (!isLoaded) {
    return <Preloader />;
  }

  // Render the app content once loaded
  return (
    <div className='app-parent'>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
