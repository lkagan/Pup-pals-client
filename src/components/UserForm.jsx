import { Form, Select, Button, Input, InputNumber } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UserForm = ({formData, onSubmit, onChange, onChangeNumber, onChangeSelect, }) => {
    return (
        <div>
          <h1>Hooman Profile</h1>
          <Form onFinish={onSubmit}>
            <label htmlFor="input-name">Name: </label>
            <Input
              allowClear
              placeholder="Vending machine"
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
            <label htmlFor="input-text">About my hooman: </label>
            <TextArea
              allowClear
              showCount
              maxLength={100}
              name="about"
              value={formData.about}
              placeholder="My hooman is the best..."
              onChange={onChange}
            />
            <Button htmlType="submit">Submit</Button>
          </Form>
        </div>
      );
}

export default UserForm;