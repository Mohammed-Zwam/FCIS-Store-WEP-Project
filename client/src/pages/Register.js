import React, { useState } from 'react';
import '../assets/styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (isNaN(birthYear) || age < 0 || age > 120) {
      alert('Please enter a valid date of birth.');
      return;
    }
    const userData = { username, email, password, dob, country };
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    alert(`Registration submitted for ${username}`);
    setUsername(''); setEmail(''); setPassword(''); setConfirmPassword(''); setDob(''); setCountry('');
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="example@gmail.com" />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
              <option value="">-- Select Country --</option>
              <option value="Egypt">Egypt</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
              <option value="India">India</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <Button variant="contained" style={{background: "var(--gradient) !important"}} type="submit" fullWidth>
            Create Account
          </Button>
          <div className="options">
            <Link to="/">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
