import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="access-console">
      <div className="console-panel">
        <div className="console-eyebrow">NEW_IDENTITY</div>
        <pre className="console-boot">
{`> allocating user record...
> preparing credentials store...
> awaiting input.`}
          <span className="console-cursor">_</span>
        </pre>
        <div className="console-grid" />
      </div>

      <div className="console-form-wrap">
        <div className="console-card">
          <div className="console-card-eyebrow">UserSphere // register</div>
          <h2 className="console-heading">Create an account</h2>

          {error && <p className="console-error">! {error}</p>}

          <form onSubmit={handleSubmit} className="console-form">
            <label className="console-field">
              <span className="console-label">full name</span>
              <input
                name="name"
                placeholder="Jane Doe"
                onChange={handleChange}
                required
              />
            </label>

            <label className="console-field">
              <span className="console-label">user@email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </label>

            <label className="console-field">
              <span className="console-label">passphrase</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="console-submit">
              Create account
            </button>
          </form>

          <p className="console-alt">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;