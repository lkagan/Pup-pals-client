import { Form, Select, Button, Input, InputNumber } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UserForm = ({formData, submitHandler, changeHandler, changeNumberHandler, changeSelectHandler, cancelHandler }) => {
  console.log(formData)
    return (
        <div>
        <form id="form" className="card row" onSubmit={submitHandler}>
            <label htmlFor="input-name">Name: </label>
            <input
              type="text"
              placeholder="Vending machine"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
    
            <label htmlFor="input-age">Age: </label>
            <input
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
              onChange={changeHandler}
            />
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
            <label htmlFor="input-text">About my hooman: </label>
            <TextArea
             style={{
            width: 300,
          }}
              allowClear
              showCount
              maxLength={100}
              name="about"
              value={formData.about}
              placeholder="My hooman is the best..."
              onChange={changeHandler}
            />
            <div className="btn-group">
                <button id="button" className="btn btn-primary" htmlType="submit">Submit</button>
                {cancelHandler && <button htmlType="button" className="btn btn-secondary" onClick={ cancelHandler }>Cancel</button>}
            </div>
          </form>
        </div>
      );
}

export default UserForm;