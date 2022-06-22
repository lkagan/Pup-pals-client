import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import errorMessage from "../utils/errorMessage";
import UserContext from "../contexts/UserContext";

import { authAxios as axios } from "../customAxios/authAxios";

import Form from "../components/UserForm";

function CreateUser() {
     const defaultFormData = {
      name: "",
      age: 0,
      gender: "",
      about: "",
    };

    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState(defaultFormData);
    const navigateTo = useNavigate();

    const getProfileDetails = async () => {
        const { data } = await axios.get(
          `http://localhost:5005/api/user/${user._id}`
        );
        setUser(() => data);
        setFormData(() => data);
      };

    const updateProfile = async () => {
        try {
          const { data } = await axios.post(
            `http://localhost:5005/api/user/${user._id}`,
            formData
          );
          setUser(data);
          navigateTo("/adddog");
        } catch (err) {
          errorMessage(err);
        }
      };
    
      useEffect(() => {
        getProfileDetails();
      }, []);
    
      const changeHandler = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const changeNumberHandler = (value) => {
        setFormData({
          ...formData,
          age: value,
        });
      };
    
      const changeSelectHandler = (value) => {
        setFormData({
          ...formData,
          gender: value,
        });
      };
    
      const submitHandler = () => {
        updateProfile();
      };

  return (
    <div>
    <Form
        formData={formData}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        changeNumberHandler={changeNumberHandler}
        changeSelectHandler={changeSelectHandler}
      />
    </div>
  )
}

export default CreateUser;