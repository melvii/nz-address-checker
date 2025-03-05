import axios from 'axios';
import querystring from 'querystring';

const getBearerToken = async () => {
    try {
        const tokenUrl = 'https://oauth.nzpost.co.nz/as/token.oauth2';
        const requestBody = querystring.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.NZ_POST_CLIENT_ID,
            client_secret: process.env.NZ_POST_CLIENT_SECRET
        });

        const response = await axios.post(tokenUrl, requestBody, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data.access_token;
    } catch (error) {
        throw new Error('Failed to get bearer token');
    }
};

export const handler  = async (event) => {
    try {
        const { address } = event.queryStringParameters || {};
        if (!address) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Address parameter is required' })
            };
        }

        // Get authentication token
        const token = await getBearerToken();

        // New API URL with query parameter
        const API_URL = `https://api.nzpost.co.nz/addresschecker/1.0/find?address_line_1=${encodeURIComponent(address)}`;

        // Call the API with updated headers and query parameters
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'client_id': process.env.NZ_POST_CLIENT_ID,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
