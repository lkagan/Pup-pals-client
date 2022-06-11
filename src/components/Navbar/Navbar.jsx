import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import "./Navbar.css";
import logo from "../../images/logo3.png";
import dog from "../../images/dogpeeking2.png";


const Navbar = (props) => {
    const { user } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    }
  return (
    <>
    <div className="dog">
    <img src={dog} width="375px" alt="dog" />
    </div>
    <nav>
    <div className="logo">
    <img src={logo} width="85px" alt="logo"/>
    </div>
   

      <div className="nav__authLinks">
        {user ? (
          <>
          <NavLink to={"/dog"} className="authLink">
            Pup Profile
            </NavLink>
            <NavLink to={"/user"} className="authLink">
            
            Hooman Profile
            </NavLink>
            
            <button className="nav-logoutbtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="authLink">
              Log In
            </NavLink>
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
