import React, { useState } from 'react';
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';
import * as fa from 'react-icons/fa';

const sideBarLinkData = [
  {
    path: '/calculator',
    label: 'Calculator',
    icon: <fa.FaCalculator />,
  },
  {
    path: '/manage-papers',
    label: 'Manage Papers',
    icon: <fa.FaCopy />,
  },
  // {
  //   path: '/saved',
  //   label: 'Saved Mailpieces',
  //   icon: <fa.FaSave />,
  // },
];
const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const [activeLink, setActiveLink] = useState(0);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`sidebar d-flex flex-column p-3 bg-light ${
        !expanded && 'collapsed'
      }`}
    >
      <div className="sidebar__brand d-flex flex-row">
        <span className="sidebar__toggle-button" onClick={toggleSidebar}>
          <fa.FaBars />
        </span>
        <span className={`sidebar__brand-name`}>Mail Tools</span>
      </div>
      <hr />

      <ul className="sidebar-menu__nav nav nav-pills flex-column">
        {sideBarLinkData.map((item, index) => (
          <li className="nav-item">
            <Link
              to={item.path}
              key={index}
              className={`sidebar-menu__nav-link nav-link d-flex ${
                activeLink === index ? 'active' : ''
              }`}
              onClick={() => {
                setActiveLink(index);
              }}
            >
              <span className="sidebar-menu__nav-icon">{item.icon}</span>
              <span
                className={`sidebar-menu__nav-label ${
                  !expanded && 'collapsed'
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
