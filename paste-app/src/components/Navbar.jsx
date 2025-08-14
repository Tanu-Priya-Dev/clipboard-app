import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    width: '100%',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    borderBottom: '1px solid #30363d',
    fontFamily: 'Fira Code, monospace',
  };

  const linkStyle = {
    color: '#c9d1d9',
    textDecoration: 'none',
    fontSize: '1.1rem',
    position: 'relative',
  };

  const activeStyle = {
    color: '#58a6ff',
    fontWeight: 'bold',
  };

  return (
    <div style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;

