import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import DogContext from '../../contexts/DogContext';

import "./Navbar.css";
import logo from "../../images/logo2.png";
import dogimg from "../../images/dogpeeking2.png";


const Navbar = (props) => {
    const { user } = useContext(UserContext);
    const { dog } = useContext(DogContext);

    // console.log("user in navbar: ", user)

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("dog");
        window.location.reload();
    }
  return (
    <>
    {/* <div className="dog">
    <img src={dogimg} width="375px" alt="dog" />
    </div> */}
    <nav>
    <NavLink to="/"><div className="logo">
    <img src={logo} width="85px" alt="logo"/>
    </div></NavLink>
   

      <div className="nav__authLinks">
      {/* {console.log('in navbar - dog: ',user)} */}
        {user ? (
          <>
          {dog && <NavLink to={`/dog/${dog._id}`} className="authLink">
            Pup Profile
            </NavLink>
          }
            <NavLink to={`/user/${user._id}`} className="authLink">
            
            Hooman Profile
            </NavLink>

            <NavLink to="/mymatches" className="authLink">
            My Matches
            </NavLink>

            <NavLink to="/search" className="authLink">
            Search
            </NavLink>
            
            <button className="nav-logoutbtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="button">
            <NavLink to={"/signup"} className="authLink">
              Sign-Up
            </NavLink>
            </button>
            {/* <NavLink to={"/login"} className="authLink">
              Log In
            </NavLink> */}
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
