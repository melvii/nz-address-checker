import React, { useState } from "react";
import { Input, Spin, Alert, Card, Button, Form } from "antd";
import axios from "axios";

const AddressChecker = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (values) => {
    const fullAddress = values.line2 ?`${values.line1}, ${values.line2 }, ${values.city}, ${values.postalCode}`:`${values.line1},  ${values.city}, ${values.postalCode}`
     

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await axios.get(`https://z5jcvvqs1i.execute-api.us-east-1.amazonaws.com/Prod/validate-address?address=${encodeURIComponent(fullAddress)}`);
      
      console.log("API Response:", response);
      console.log("API Response:", response.data?.success);

      if (response.data?.success) {
        const validAddress = response.data.addresses.find(addr => addr.MatchScore >= 95);
        if (validAddress) {
          setSuccessMessage(`Address Validated: ${fullAddress}`);
        } else {
          setError("Invalid address");
        }
      } else {
        setError("Invalid address");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to validate address");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: ""  }}>
      <Card style={{ maxWidth: 500, width: "100%", textAlign: "center", padding: "20px" }}>
        <h2>NZ Address Checker</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Address Line 1" name="line1" rules={[{ required: true, message: "Address Line 1 is required" }]}> 
            <Input placeholder="Enter Address Line 1" />
          </Form.Item>

          <Form.Item label="Address Line 2" name="line2">
            <Input placeholder="Enter Address Line 2 (Optional)" />
          </Form.Item>

          <Form.Item label="City" name="city" rules={[{ required: true, message: "City is required" }]}> 
            <Input placeholder="Enter City" />
          </Form.Item>

          <Form.Item label="Postal Code" name="postalCode" rules={[{ required: true, message: "Postal Code is required" }]}> 
            <Input placeholder="Enter Postal Code" />
          </Form.Item>

          {loading && <Spin style={{ margin: "10px" }} />}
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
          {successMessage && <Alert message={successMessage} type="success" showIcon style={{ marginBottom: 10 }} />}

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}> 
            Validate Address
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddressChecker;
