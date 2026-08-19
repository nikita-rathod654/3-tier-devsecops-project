import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from '../axios';
import UserForm from '../components/UserForm';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const formRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = () => {
    axios
      .get('/users') // ✅ Fixed
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Fetch Error:', err);
        if (err.response?.status === 401) logout();
      });
  };

  const handleCreate = (userData) => {
    axios
      .post('/users', userData) // ✅ Fixed
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch(err => console.error('Create Error:', err));
  };

  const handleUpdate = (id, userData) => {
    if (user?.role !== 'admin') return;
    axios
      .put(`/users/${id}`, userData) // ✅ Fixed
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch(err => console.error('Update Error:', err));
  };

  const handleDelete = (id) => {
    if (user?.role !== 'admin') return;
    axios
      .delete(`/users/${id}`) // ✅ Fixed
      .then(fetchUsers)
      .catch(err => console.error('Delete Error:', err));
  };

  const handleEditClick = (selectedUser) => {
    if (user?.role === 'admin') {
      setEditingUser(selectedUser);
    }
  };

  return (
    <div className="dash-console">
      <div className="dash-topbar">
        <div>
          <div className="dash-eyebrow">USER_REGISTRY</div>
          <h2 className="dash-heading">User Manager</h2>
        </div>
        <div className="dash-user-chip">
          <span className="dash-user-name">{user?.name}</span>
          <span className="dash-user-role">{user?.role}</span>
          <button className="dash-logout" onClick={logout}>Logout</button>
        </div>
      </div>

      {(user?.role === 'admin' || user?.role === 'viewer') && (
        <div ref={formRef} className="dash-form-card">
          <UserForm
            onSubmit={
              editingUser && user?.role === 'admin'
                ? (data) => handleUpdate(editingUser.id, data)
                : handleCreate
            }
            user={editingUser && user?.role === 'admin' ? editingUser : null}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}

      <div className="dash-table-card">
        <table className="dash-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(userData => (
              <tr key={userData.id}>
                <td data-label="ID">{userData.id}</td>
                <td data-label="Name">{userData.name}</td>
                <td data-label="Email">{userData.email}</td>
                <td data-label="Actions">
                  {user?.role === 'admin' ? (
                    <div className="dash-actions">
                      <button className="dash-btn-edit" onClick={() => handleEditClick(userData)}>Edit</button>
                      <button className="dash-btn-delete" onClick={() => handleDelete(userData.id)}>Delete</button>
                    </div>
                  ) : (
                    <span className="dash-na">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<button
  className="dash-fab"
  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
  aria-label="Scroll to form"
>
  ↓
</button>
    </div>
  );
}

export default UserDashboard;