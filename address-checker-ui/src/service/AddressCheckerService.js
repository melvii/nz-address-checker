import axios from "axios";
import _ from "lodash";

const API_URL = "https://z5jcvvqs1i.execute-api.us-east-1.amazonaws.com/Prod/validate-address";

const AddressService = {
  // Function to add commas to address
  formatAddress(address) {
    if (!address || address.trim() === "") {
      return null;
    }

    const addressParts = address.split(" ");
    if (addressParts.length < 4) return address;

    const postcode = addressParts.pop();
    const city = addressParts.pop();
    const suburb = addressParts.pop();
    const street = addressParts.join(" ");

    return `${street}, ${suburb}, ${city} ${postcode}`;
  },

  // Function to validate the address via API
  async validateAddress(fullAddress) {
    if (!fullAddress) return { success: false, message: "Invalid address" };

    try {
      const response = await axios.get(`${API_URL}?address=${encodeURIComponent(fullAddress)}`);
      console.log("API Response:", response.data);

      if (response.data?.success) {
        const validAddress = response.data.addresses.find(addr => addr.MatchScore >= 80);
        return validAddress ? { success: true, message: `Address Validated: ${fullAddress}` } : { success: false, message: "Invalid address" };
      }
      return { success: false, message: "Invalid address" };
    } catch (err) {
      console.error("API Error:", err);
      return { success: false, message: "Failed to validate address" };
    }
  }
};

export default AddressService;