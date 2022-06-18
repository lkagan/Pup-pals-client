import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios as axios } from "../customAxios/authAxios";
import errorMessage from "../utils/errorMessage";
import Form from "../components/DogForm";

const DogProfile = () => {
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
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [editToggler, setEditToggler] = useState(false);

  

  const getProfileDetails = async () => {
    console.log("this is the", id);
    const { data } = await axios.get(`http://localhost:5005/api/dog/${id}`);
    setDog(() => data);
    setFormData(() => data);
  };

  useEffect(() => {
    try {
      getProfileDetails();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateProfile = async () => {
    try {
      const { data } = await axios.push(
        `http://localhost:5005/api/dog/${id}`,
        formData
      );
      setDog(() => data);
      setEditToggler(() => !editToggler);
    } catch (err) {
      errorMessage(err);
    }
  };

  const deleteDog = async () => {
    const { data } = await axios.delete(`http://localhost:5005/api/dog/${id}`);
    navigateTo("/adddog");
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
        // console.log("response is: ", response);
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
      updateProfile();

      // navigateTo("/search");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = () => {
    try {
      deleteDog();
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = (e) => {
    setEditToggler(() => !editToggler);
  };

  return (
    <div>
      <h1>Pup Profile</h1>
      {dog && !editToggler && (
        <div key={dog._id}>
          <img src={dog.imageUrl} alt="dog" />
          <p>{dog.name}</p>
          <p>{dog.age}</p>
          <p>{dog.size}</p>
          <p>{dog.gender}</p>
          <p>{dog.breed}</p>
          <p>{dog.about}</p>
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
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
            changeSizeHandler={changeSizeHandler}
            handleFileUpload={handleFileUpload}
          />
          <button onClick={editHandler}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DogProfile;
