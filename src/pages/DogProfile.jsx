import { useState, useEffect, useContext } from "react";
import { Form, Select, Button, Input, InputNumber, Space, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios as axios } from "../customAxios/authAxios";
import errorMessage from "../utils/errorMessage";

const { Option } = Select;
const { TextArea } = Input;



const DogProfile = () => {
  const defaultFormData = {
    name: "",
    age: 0,
    size: "",
    gender: "",
    breed: "",
    about: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const getProfileDetails = async () => {
    const { data } = await axios.get(`http://localhost:5005/api/dog/${id}`);
    // setUser(() => data);
    setFormData(() => data);
  };

  const createProfile = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5005/api/dog`,
        formData
      );
    } catch (err) {
     errorMessage(err);
    }
    // setUser(data);
  };

  const updateProfile = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5005/api/dog/${id}`,
        formData
      );
    } catch (err) {
      errorMessage(err);
    }

    // setUser(data);
  };

  useEffect(() => {
    try {
      id && getProfileDetails();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // const uploadImage = (file) => {
  //   return api.post("/dog", file)
  //     .then(res => res.data)
  //     .catch(errorHandler);
  // };

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

  const onChangeSize = (value) => {
    setFormData({
      ...formData,
      size: value,
    });
  };

  const onSubmit = () => {
    try {
      if (id) {
        updateProfile();
      } else {
        createProfile();
      }
      // navigateTo("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Card title="Pup Profile" size="large">
          <Form onFinish={onSubmit}>
            <label htmlFor="input-name">Name: </label>
            <Input
              allowClear
              placeholder=""
              label="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />

            <label htmlFor="input-age">Age: </label>
            <InputNumber
              type="number"
              name="age"
              value={formData.age}
              placeholder="Age"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
              onChange={onChangeNumber}
            />
            <label htmlFor="input-size">Size: </label>
            <Select
              style={{
                width: 120,
              }}
              name="size"
              value={formData.size}
              allowClear
              onChange={onChangeSize}
            >
              <Option value="miniature">Miniature</Option>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="very large">Very Large</Option>
            </Select>
            <label htmlFor="input-gender">Gender: </label>
            <Select
              style={{
                width: 120,
              }}
              name="gender"
              value={formData.gender}
              allowClear
              onChange={onChangeSelect}
            >
              <Option value="female">Female</Option>
              <Option value="male">Male</Option>
            </Select>
            <label htmlFor="input-breed">Breed: </label>
            <Input
              allowClear
              placeholder=""
              name="breed"
              value={formData.breed}
              onChange={onChange}
            />
            <label htmlFor="input-text">About me: </label>
            <TextArea
              allowClear
              showCount
              maxLength={100}
              name="about"
              value={formData.about}
              placeholder="I love to eat"
              onChange={onChange}
            />
            <Button htmlType="submit">Submit</Button>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default DogProfile;
