import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup";
import axios from "axios";
import UserContext from '../contexts/UserContext';



export default function LogIn({ authenticate }) {
  const { setUser } = useContext(UserContext);

  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setFormData({ ...formData, [name]: value });
  }


  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5005/login`,
        formData
      );
      setUser(() => data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    navigateTo("/");
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={submitFormData} className="signup__form">
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
      <Link to={"/signup"} className="authLink">
              Signup
            </Link>
    </div>
  );
}
