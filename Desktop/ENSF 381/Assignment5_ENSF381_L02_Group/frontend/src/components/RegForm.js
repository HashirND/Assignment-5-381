import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate();

  // Validate all the inputs
  const validateForm = () => {
    const errorsArr = [];

    // Username: between 3 and 20 characters, must start with a letter, allowed: alphanumeric, hyphens, underscores.
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    if (!usernameRegex.test(username)) {
      errorsArr.push('Username must be 3-20 characters long, start with a letter, and can only contain letters, numbers, hyphens, and underscores.');
    }

    // Password: at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, one special character, no spaces.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=\+\[\]{}|;:'",.<>\/?`~])[A-Za-z\d!@#$%^&*()\-_=\+\[\]{}|;:'",.<>\/?`~]{8,}$/;
    if (!passwordRegex.test(password)) {
      errorsArr.push('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character, and contain no spaces.');
    }

    // Confirm Password: Must match the password.
    if (password !== confirmPassword) {
      errorsArr.push('Passwords do not match.');
    }

    // Email: Should have a valid format (e.g., username@example.com) with domain extensions like .com, .net, or .io
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;
    if (!emailRegex.test(email)) {
      errorsArr.push('Please enter a valid email (e.g., username@example.com) with .com, .net, or .io domain.');
    }

    setErrors(errorsArr);
    return errorsArr.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = { username, password, email };
      try {
        // Call the backend register API endpoint
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
          // On success, redirect to the login page
          navigate('/login');
        } else {
          // If the API returns an error, e.g. username already exists
          setErrors([data.message || 'Registration failed. Please try again.']);
        }
      } catch (error) {
        setErrors(['An error occurred. Please try again later.']);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          {errors.map((err, idx) => (
            <p key={idx} style={{ margin: '5px 0' }}>{err}</p>
          ))}
        </div>
      )}
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      
      <button type="submit" style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        margin: '10px 0',
        opacity: '0.5',
        cursor: 'pointer',
        width: '100%'
      }}
        onMouseEnter={(e) => { 
          e.target.style.backgroundColor = '#45A049'; 
          e.target.style.opacity = '1.0'; 
        }}
        onMouseLeave={(e) => { 
          e.target.style.backgroundColor = '#4CAF50'; 
          e.target.style.opacity = '0.5'; 
        }}
      >
        Signup
      </button>
    </form>
  );
};

export default RegForm;
