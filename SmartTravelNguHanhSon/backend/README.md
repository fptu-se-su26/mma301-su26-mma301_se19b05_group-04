# SmartTravelNguHanhSon Backend

Node.js + Express backend serving APIs for Smart Travel Ngu Hanh Son.

## Directory Structure

```
backend/
├── config/       # Database configurations, payment gateways, etc.
├── routes/       # API endpoint route declarations
├── controllers/  # Request handlers and controllers
├── models/       # Database schemas (Mongoose)
├── services/     # External services (SMS, Mail, etc.)
├── middlewares/  # Express middlewares (auth validation, error handling)
└── utils/        # Utility / helper functions
```

## Get Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy env file and adjust variables:
   ```bash
   cp .env.example .env
   ```

3. Start in development mode (using nodemon):
   ```bash
   npm run dev
   ```

4. Production start:
   ```bash
   npm start
   ```
