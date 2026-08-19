import React from 'react';
import logo from '../logo.svg';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="brand">
          <img src={logo} alt="UserSphere logo" className="brand-logo" />
          <div>
            <h1 className="brand-title">UserSphere</h1>
            <p className="brand-subtitle">Manage Users, Deploy Faster</p>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <h3 className="sidebar-heading">Connect</h3>
          <ul className="social-links">
            <li>
              <a className="sidebar-btn" href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="sidebar-btn" href="#" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
            <li>
              <a className="sidebar-btn" href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;