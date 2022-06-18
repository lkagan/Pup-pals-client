import { Form, Select, Button, Input, InputNumber, Space, Card, Image} from "antd";

const { Option } = Select;
const { TextArea } = Input;

const DogForm = ({formData, submitHandler, changeHandler, changeNumberHandler, changeSizeHandler, changeSelectHandler, handleFileUpload}) => {
    return (
        <div>
          <Space direction="vertical" size="small" style={{ display: "flex" }}>
            <Card title="Pup Profile" size="large">
              <Form onFinish={submitHandler}>
              <input type="file" onChange={e => handleFileUpload(e)} />
    
                <label htmlFor="input-name">Name: </label>
                <Input
                  allowClear
                  placeholder=""
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
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
                  onChange={changeNumberHandler}
                />
                <label htmlFor="input-size">Size: </label>
                <Select
                  style={{
                    width: 120,
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
                    width: 120,
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
                <Input
                  allowClear
                  placeholder=""
                  name="breed"
                  value={formData.breed}
                  onChange={changeHandler}
                />
                <label htmlFor="input-text">About me: </label>
                <TextArea
                  allowClear
                  showCount
                  maxLength={100}
                  name="about"
                  value={formData.about}
                  placeholder="I love to eat"
                  onChange={changeHandler}
                />
                <Button htmlType="submit">Submit</Button>
              </Form>
            </Card>
          </Space>
        </div>
      );
}

export default DogForm;