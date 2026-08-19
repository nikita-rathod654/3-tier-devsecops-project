// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, logout, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null); // ✅ track which user is being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } }; // ✅ Bearer scheme

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users', authHeader);
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users failed:', err);
      if (err.response?.status === 401) logout();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/users',
        { ...formData, role: 'viewer' },
        authHeader
      );
      setFormData({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      alert('User creation failed');
    }
  };

  // ✅ Load selected user into the form for editing
  const handleEditClick = (u) => {
    if (user?.role !== 'admin') return;
    setEditingId(u.id);
    setFormData({ name: u.name, email: u.email, password: '' });
  };

  // ✅ Submit update instead of create when editingId is set
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/users/${editingId}`,
        { name: formData.name, email: formData.email },
        authHeader
      );
      setFormData({ name: '', email: '', password: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      alert('User update failed');
    }
  };

  // ✅ Delete now actually calls the API
  const handleDelete = async (id) => {
    if (user?.role !== 'admin') return;
    try {
      await axios.delete(`/users/${id}`, authHeader);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('User delete failed');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="container">
      <div className="header">
        <h2>User Manager (React + Node + MySQL)</h2>
        <div>
          {user?.name} (<b>{user?.role}</b>) <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* ✅ Form now gated to admin/viewer, matching UserDashboard.js */}
      {(user?.role === 'admin' || user?.role === 'viewer') && (
        <form className="user-form" onSubmit={editingId ? handleUpdateUser : handleAddUser}>
          <input
            className="form-field"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="form-field"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* ✅ Password only required/shown when creating, not editing */}
          {!editingId && (
            <input
              className="form-field"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{editingId ? 'Update User' : 'Add Viewer User'}</button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          )}
        </form>
      )}

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {user?.role === 'admin' ? (
                  <>
                    {/* ✅ Both buttons now wired to real handlers */}
                    <button onClick={() => handleEditClick(u)}>Edit</button>{' '}
                    <button onClick={() => handleDelete(u.id)}>Delete</button>
                  </>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;