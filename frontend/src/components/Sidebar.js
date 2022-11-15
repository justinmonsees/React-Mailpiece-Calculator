import React from 'react';
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3 bg-light">
      <div className="sidebar__brand">
        <span className="sidebar__brand-name">Mail Tools</span>
      </div>
      <hr />

      <ul className="sidebar-menu__nav nav nav-pills flex-column">
        <Link to="/" className="sidebar-menu__nav-link nav-link ">
          <span className="sidebar-menu__nav-label">Calculator</span>
        </Link>

        <Link to="/manage-papers" className="sidebar-menu__nav-link nav-link ">
          <span className="sidebar-menu__nav-label">Manage Papers</span>
        </Link>

        <Link to="/saved" className="sidebar-menu__nav-link nav-link ">
          <span className="sidebar-menu__nav-label">Saved Mailpieces</span>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
