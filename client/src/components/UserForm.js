import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (user) {
      // Pre-fill name and email for editing, password left blank
      setForm({ name: user.name, email: user.email, password: '' });
    } else {
      // Reset form for creation
      setForm({ name: '', email: '', password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
    };

    // Only include password if adding
    if (!user) {
      payload.password = form.password;
    }

    onSubmit(payload);

    // Reset form after submission if creating
    if (!user) {
      setForm({ name: '', email: '', password: '' });
    }
  };

  return (
    <form className="uf-form" onSubmit={handleSubmit}>
      <div className="uf-fields">
        <label className="uf-field">
          <span className="uf-label">name</span>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="uf-field">
          <span className="uf-label">email</span>
          <input
            type="email"
            name="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        {!user && (
          <label className="uf-field">
            <span className="uf-label">password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        )}
      </div>
      <div className="uf-button-group">
        <button type="submit" className="uf-submit">
          {user ? 'Update' : 'Add Viewer User'}
        </button>
        {user && (
          <button type="button" className="uf-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;