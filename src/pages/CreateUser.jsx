import { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorMessage from "../utils/errorMessage";

import { authAxios as axios } from "../customAxios/authAxios";

import Form from "../components/UserForm";

function CreateUser() {
    const { user, setUser } = useContext(UserContext);

    const defaultFormData = {
      name: "",
      age: 0,
      gender: "",
      about: "",
    };

    const [formData, setFormData] = useState(defaultFormData);
    const navigateTo = useNavigate();

    const updateProfile = async () => {
        try {
          const { data } = await axios.post(
            `http://localhost:5005/api/user/${user._id}`,
            formData
          );
          setUser(data);
          navigateTo("/dog");
        } catch (err) {
          errorMessage(err);
        }
      };
    
      useEffect(() => {
        getProfileDetails();
      }, []);
    
      const onChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const onChangeNumber = (value) => {
        setFormData({
          ...formData,
          age: value,
        });
      };
    
      const onChangeSelect = (value) => {
        setFormData({
          ...formData,
          gender: value,
        });
      };
    
      const onSubmit = () => {
        updateProfile();
      };

  return (
    <div>CreateUser</div>
  )
}

export default CreateUser