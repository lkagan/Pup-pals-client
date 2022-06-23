import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios as axios } from "../customAxios/authAxios";
import errorMessage from "../utils/errorMessage";
import UserContext from "../contexts/UserContext";
import Form from "../components/UserForm"

const UserProfile = () => {
  const defaultFormData = {
    name: "",
    age: 0,
    gender: "",
    about: "",
  };

  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(defaultFormData);
  const navigateTo = useNavigate();
  const [editToggler, setEditToggler] = useState(false);

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
      navigateTo("/search");
      setEditToggler(() => !editToggler);
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

  const editHandler = (e) => {
    setEditToggler(() => !editToggler);
  };

  return (
    <div>
      <h2>Hooman Profile</h2>
      {user && !editToggler && (
        <div className="card content-small" key={user._id}>
          <p>{user.name}</p>
          <p>{user.age}</p>
          <p>{user.gender}</p>
          <p>{user.about}</p>
          <button onClick={editHandler}>Edit</button>
        </div>
      )}
      {editToggler && (
        <div>
          <Form
            formData={formData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            changeNumberHandler={changeNumberHandler}
            changeSelectHandler={changeSelectHandler}
            cancelHandler={editHandler}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
