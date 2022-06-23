import {Select, Input} from "antd";

const { Option } = Select;
const { TextArea } = Input;

const DogForm = ({
  formData,
  submitHandler,
  changeHandler,
  changeSizeHandler,
  changeSelectHandler,
  handleFileUpload,
  cancelHandler,
}) => {
  return (
    <div>
      <form id="form" className="card row" onSubmit={submitHandler}>
        <label htmlFor="input-name">Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={changeHandler}
        />

        <label htmlFor="input-age">Age: </label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
          ]}
          onChange={changeHandler}
        />
        <label htmlFor="input-size">Size: </label>
        <Select
          style={{
            width: 300,
          }}
          name="size"
          value={formData.size}
          allowClear
          onChange={changeSizeHandler}
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
            width: 300,
          }}
          name="gender"
          value={formData.gender}
          allowClear
          onChange={changeSelectHandler}
        >
          <Option value="female">Female</Option>
          <Option value="male">Male</Option>
        </Select>
        <label htmlFor="input-breed">Breed: </label>
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={changeHandler}
        />
        <label htmlFor="input-text">About me: </label>
        <TextArea
        style={{
            width: 300,
          }}
          allowClear
          showCount
          maxLength={100}
          name="about"
          value={formData.about}
          placeholder="I love to eat"
          onChange={changeHandler}
        />
        <label htmlFor="input-image">Profile Picture: </label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <button id="button" className="row" htmlType="submit">Submit</button>
        {cancelHandler && <button
          className="row"
          onClick={cancelHandler}
          htmlType="button"
        >
          Cancel
        </button>}
      </form>
    </div>
  );
};

export default DogForm;
