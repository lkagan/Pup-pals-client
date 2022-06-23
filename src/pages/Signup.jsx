import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import  axios from "axios";
import UserContext from '../contexts/UserContext';



export default function Signup({ authenticate }) {
  const { setUser } = useContext(UserContext);

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
        `http://localhost:5005/api/auth/signup`,
        formData
      );
      setUser(() => data);
      localStorage.setItem("token", data.token);
      navigate("/createuser");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <form  id="form" className= "card row" onSubmit={submitFormData}>
      <h1 id="headerTitle">Sign-up</h1>
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="text"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Enter your password"
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

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <p className="link">
          Already have an account? Awesome, <Link to={"/login"}>Login!</Link>
        </p>
      </form>
    </div>
  );
}
