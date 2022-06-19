import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import errorMessage from "../utils/errorMessage";
import UserContext from "../contexts/UserContext";

import { authAxios as axios } from "../customAxios/authAxios";

import Form from "../components/DogForm";

const AddDog = () => {
  const defaultFormData = {
    imageUrl: "",
    name: "",
    age: 0,
    size: "",
    gender: "",
    breed: "",
    about: "",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [imageUrl, setImageUrl] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigateTo = useNavigate();

  const createProfile = async (e) => {
    console.log(formData);
    try {
      const { data } = await axios.post(
        `http://localhost:5005/api/dog`,
        {formData, userId: user._id}
      );
      localStorage.setItem("dog", JSON.stringify(data));
    } catch (err) {
      errorMessage(err);
    }
    // setUser(data);
  };

  const uploadImage = (file) => {
    return axios
      .post("http://localhost:5005/api/dog/upload", file)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response.fileUrl);
        // response carries "fileUrl" which we can use to update the state

        // setImageUrl(() => response.fileUrl);
        setFormData({ ...formData, imageUrl: response.fileUrl });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

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

  const changeSizeHandler = (value) => {
    setFormData({
      ...formData,
      size: value,
    });
  };

  const submitHandler = (e) => {
    try {
      createProfile();

      navigateTo("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create Pup Profile</h1>
      <Form
        formData={formData}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        changeNumberHandler={changeNumberHandler}
        changeSelectHandler={changeSelectHandler}
        changeSizeHandler={changeSizeHandler}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};
export default AddDog;
