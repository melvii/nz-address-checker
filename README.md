Here's a **README.md** file for your project repository:  

---

### **NZ Address Checker** 🏡  

This is a **serverless web application** that validates New Zealand addresses in **real-time** using the **NZ Post Address Checker API**. The application is built using **React.js (Vite) and Ant Design** for the frontend and **AWS Lambda with API Gateway** for the backend.  

---

## **🚀 Features**
✅ **Real-time address validation** \
✅ **Serverless deployment** on AWS (S3, Lambda, API Gateway)  
✅ **Secure authentication** with OAuth 2.0  
✅ **Modern UI** with React.js and Ant Design  

---

## **🛠 Tech Stack**
### **Frontend**  
- **React.js (Vite)**  
- **Ant Design (antd)**  
- **Axios** for API calls  

### **Backend**  
- **AWS Lambda (Node.js)**  
- **API Gateway**  
- **NZ Post Address Checker API**  
- **OAuth 2.0 authentication**  

### **Deployment**  
- **Frontend**: Hosted on **AWS S3 **  
- **Backend**: Deployed using **AWS Lambda + API Gateway**  

---


## **🔧 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/melvii/nz-address-checker.git
cd nz-address-checker
```

### **2️⃣ Backend Setup**
1. Navigate to the `backend` folder:  
   ```sh
   cd backend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):  
   ```
   NZ_POST_CLIENT_ID=your_client_id
   NZ_POST_CLIENT_SECRET=your_client_secret
   ```
4. Deploy to AWS Lambda (Optional):  
   ```sh
   npm run deploy
   ```

### **3️⃣ Frontend Setup**
1. Navigate to the `frontend` folder:  
   ```sh
   cd ../frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the development server:  
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.  

---






