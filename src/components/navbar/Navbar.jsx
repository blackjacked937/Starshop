import React from "react";
import "./Navbar.css";
import Logo from "./logo/Logo";
import CartWidget from "../CartWidget/CartWidget";
import MyMenu from "./mymenu/MyMenu";
import BotonDarkMode from './BotonDarkMode/BotonDarkMode';

// Context
import { useDarkModeContext } from '../../context/DarkModeContext';

// React Icons
import { FaUserPlus } from 'react-icons/fa';  // Ícono para el registro
import { FaFileContract } from 'react-icons/fa';  // Ícono para aviso de privacidad

const Navbar = () => {
  const { darkMode } = useDarkModeContext();

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${darkMode ? 'myNav' : 'bg-dark'}`}>
      <div className="container-fluid">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse liMenu" id="navbarSupportedContent">
          <MyMenu />
          <BotonDarkMode />
        </div>
        <CartWidget />
        {/* Ícono de registro */}
        <button className="btn btn-link" onClick={() => window.location.href = '/register'}>
          <FaUserPlus size={24} color="white" />
        </button>
        {/* Ícono de aviso de privacidad */}
        <button className="btn btn-link" onClick={() => window.location.href = '/aviso'}>
          <FaFileContract size={24} color="white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
