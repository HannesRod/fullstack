import React, { useState, useEffect } from 'react';
import './NotHome.css';
const NotHome = () => {
    // Initialize counter state with useState
    const [count, setCount] = useState(0);
    // State for message display
    const [message, setMessage] = useState('');
  
    // useEffect to handle counter conditions
    useEffect(() => {
      // Reset counter if it goes below 0
      if (count < 0) {
        setCount(0);
        setMessage('Counter cannot go below 0!');
        // Clear message after 2 seconds
        const timeout = setTimeout(() => setMessage(''), 2000);
        return () => clearTimeout(timeout);
      }
  
      // Show message when counter passes 5
      if (count > 5) {
        setMessage('You passed 5!');
        // Clear message after 2 seconds
        const timeout = setTimeout(() => setMessage(''), 2000);
        return () => clearTimeout(timeout);
      }
    }, [count]); // Only run effect when count changes
  
    // Handler functions for increasing and decreasing counter
    const handleIncrease = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const handleDecrease = () => {
      setCount(prevCount => prevCount - 1);
    };
  
    return (
      <div className="not-home-container">
        <h1 className="not-home-title">Welcome to the Counter Page</h1>
        
        <div className="counter-section">
          <h2 className="counter-value">Counter: {count}</h2>
          
          <div className="button-group">
            <button 
              className="counter-button decrease" 
              onClick={handleDecrease}
              aria-label="Decrease counter"
            >
              -
            </button>
            <button 
              className="counter-button increase" 
              onClick={handleIncrease}
              aria-label="Increase counter"
            >
              +
            </button>
          </div>
  
          {message && (
            <div className="message">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default NotHome;