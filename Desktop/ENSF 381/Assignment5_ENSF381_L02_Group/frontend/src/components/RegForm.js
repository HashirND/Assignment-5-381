import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const errorsArr = [];

    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    if (!usernameRegex.test(username)) {
      errorsArr.push('Invalid username (Must be 3-20 characters, start with a letter, and can include letters, numbers, hyphens, underscores)');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=\+\[\]{}|;:'",.<>\/?`~])[A-Za-z\d!@#$%^&*()\-_=\+\[\]{}|;:'",.<>\/?`~]{8,}$/;
    if (!passwordRegex.test(password)) {
      errorsArr.push('Invalid password (Must be at least 8 characters with upper, lower, number, special char)');
    }

    if (password !== confirmPassword) {
      errorsArr.push('Passwords do not match');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;
    if (!emailRegex.test(email)) {
      errorsArr.push('Invalid email (e.g. user@example.com)');
    }

    setErrors(errorsArr);
    return errorsArr.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setStatusMessage('');
    setIsSuccess(false);

    if (validateForm()) {
      const newUser = { username, password, email };
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
          setIsSuccess(true);
          setStatusMessage('Signup successful! Redirecting to login...');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setStatusMessage(data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        setStatusMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {(errors.length > 0 || statusMessage) && (
  <div style={{
    marginTop: '30px',
    width: '250%',
    marginLeft: '-75%',
    border: '1px solid black',
    padding: '10px',
    textAlign: 'center'
  }}>
    {errors.length > 0
      ? errors.map((err, idx) => (
          <p key={idx} style={{ margin: 0 }}>{err}</p>
        ))
      : <p style={{ margin: 0 }}>{statusMessage}</p>
    }
  </div>
)}


<div style={{
  marginTop: '15px',
  textAlign: 'center'
}}>
  <Link to="/login">Already have an account? Login here</Link>
</div>

    </form>
  );
};

export default RegForm;
