import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup";
import axios from "axios";
import UserContext from '../contexts/UserContext';
import { Button, Checkbox, Form, Input } from 'antd';




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

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5005/api/auth/login`,
        formData
      );
      setUser(() => data);
      console.log("this is data", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem('dog', JSON.stringify(data.dog));

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
    // <div>
    // <h2>Log In</h2>
    // <Form
    //   name="basic"
    //   labelCol={{
    //     span: 8,
    //   }}
    //   wrapperCol={{
    //     span: 16,
    //   }}
    //   initialValues={{
    //     remember: true,
    //   }}
    //   onSubmit={submitFormData}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <Form.Item
      
    //     label="Email"
    //     type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={handleInputChange}
    //     rules={[
    //       {
    //         required: true,
    //         message: 'Please input your email!',
    //       },
    //     ]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={handleInputChange}
    //     rules={[
    //       {
    //         required: true,
    //         message: 'Please input your password!',
    //       },
    //     ]}
    //   >
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item
    //     name="remember"
    //     valuePropName="checked"
    //     wrapperCol={{
    //       offset: 8,
    //       span: 16,
    //     }}
    //   >
    //     <Checkbox>Remember me</Checkbox>
    //   </Form.Item>

    //   <Form.Item
    //     wrapperCol={{
    //       offset: 8,
    //       span: 16,
    //     }}
    //   >
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
    // </div>
  );
}




 
    
