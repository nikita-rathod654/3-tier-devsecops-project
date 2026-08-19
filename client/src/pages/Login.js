import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const BOOT_LINES = [
  '> initializing session...',
  '> checking credentials service...',
  '> ready.'
];

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [bootText, setBootText] = useState('');

  useEffect(() => {
    const fullText = BOOT_LINES.join('\n');
    let i = 0;
    const interval = setInterval(() => {
      setBootText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="access-console">
      <div className="console-panel">
        <div className="console-eyebrow">ACCESS_CONTROL</div>
        <pre className="console-boot">{bootText}<span className="console-cursor">_</span></pre>
        <div className="console-grid" />
      </div>

      <div className="console-form-wrap">
        <div className="console-card">
          <div className="console-card-eyebrow">UserSphere // sign in</div>
          <h2 className="console-heading">Welcome back</h2>

          {error && <p className="console-error">! {error}</p>}

          <form onSubmit={handleSubmit} className="console-form">
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
              Authenticate
            </button>
          </form>

          <div className="console-tip">
            Use a strong password and never share your credentials. Access
            requests → <a href="mailto:support@UserSphere.com">support</a>.
          </div>

          <p className="console-alt">
            No account yet? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;