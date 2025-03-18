import React, { useState, useCallback } from "react";
import { Input, Spin, Alert, Card, Form } from "antd";
import _ from "lodash";
import AddressService from "../service/AddressCheckerService"; // Import the service

const AddressChecker = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Debounced function to validate the address
  const debouncedValidateAddress = useCallback(
    _.debounce(async (formattedAddress) => {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const result = await AddressService.validateAddress(formattedAddress);
      console.log(result)

      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500),
    []
  );

  // Handle form changes and trigger formatting and validation
  const handleChange = () => {
    const values = form.getFieldsValue();
    const rawAddress = values.line1.trim(); // Get the address input

    const formatted = AddressService.formatAddress(rawAddress); // Format the address
    console.log(formatted);
    debouncedValidateAddress(formatted);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card style={{ maxWidth: 500, width: "100%", textAlign: "center", padding: "20px" }}>
        <h2>NZ Address Checker</h2>
        <Form form={form} layout="vertical" onChange={handleChange}>
          <Form.Item label="Address Line 1" name="line1" rules={[{ required: true, message: "Address Line 1 is required" }]}>
            <Input placeholder="Enter Address Line 1" />
          </Form.Item>

          {loading && <Spin style={{ margin: "10px" }} />}
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
          {successMessage && <Alert message={successMessage} type="success" showIcon style={{ marginBottom: 10 }} />}
        </Form>
      </Card>
    </div>
  );
};

export default AddressChecker;
