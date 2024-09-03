# Sunvoy Affiliate Tool

Sunvoy Affiliate Tool is a comprehensive revenue forecasting tool designed for affiliate marketers. It allows users to project their revenue on a monthly basis by considering new and existing projects. The tool forecasts affiliate payouts up to the next one year, providing insights into potential earnings.

## Features

- **Revenue Forecasting:** Predict monthly revenue based on new and existing projects.
- **Affiliate Payout:** Forecast affiliate payouts for the next 12 months.
- **Visual Representation:** Revenue graphs with bar charts.
- **Modern Tech Stack:** Built using Remix, TypeScript, TanStack React Query, Axios, Redux, Redux Persist, ShadCN TailwindCSS, Nest.js, Firebase Firestore, and Swagger UI.

## Tech Stack

### Frontend

- **Remix** with **TypeScript**
- **TanStack React Query** for API implementation
- **Axios** for HTTP requests
- **Redux** and **Redux Persist** for state management
- **ShadCN** and **TailwindCSS** for UI styling
- **Bar Chart** for revenue visualization

### Backend

- **Nest.js** with **TypeScript**
- **Firebase Firestore** as the database
- **Swagger UI** for API documentation
- **CI/CD Pipeline** for automated deployment

## Getting Started

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sunvoy-affiliate-tool.git
   cd sunvoy-affiliate-tool/backend
2. **Create the environment variables file:**
   ```bash
   touch .env
   ```
3. **Add the following to .env:**
  API_KEY="wahab"

4. **Create the Firebase credentials file:**
   ```bash
   touch .credentials.json
   ```
5. **Add your Firebase service account credentials to firebase-credentials.json:**
   ```bash
   {
   "type": "service_account",
   "project_id": "your-project-id",
   "private_key_id": "your-private-key-id",
   "private_key": "your-private-key",
   "client_email": "your-client-email",
   "client_id": "your-client-id",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-client-email"
   }
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
 ```bash
   cd ../frontend
```
2. **Create the environment variables file:**
   ```bash
   touch .env
   ```
3. **Add the following to .env:**
  VITE_BASE_URL="https://sunvoy-affiliate.mooo.com"
  VITE_API_KEY="wahab"


### Running the Project
1. **Install dependencies for both backend and frontend:**
  ```bash
npm i -g pnpm
cd backend
npm install
cd ../frontend
npm install
```
2. **Start the backend server:**
 ```bash
   cd ../backend
  pnpm start:dev
```
3. **Start the frontend server:**
```bash
cd ../frontend
pnpm run dev
```





   
  
