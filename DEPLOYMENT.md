# Production Deployment Guide

## Prerequisites
- Node.js 18+ installed
- SMTP credentials (Gmail, SendGrid, etc.)

## Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Create .env file** (copy from .env.example)
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables**
   Edit `.env` and add your SMTP credentials:
   ```env
   PORT=3001
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   OWNER_EMAIL=owner@example.com
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Single Server (Node.js)
Serve both frontend and backend from one server:

```javascript
// In server/index.js, add:
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

### Option 2: Separate Deployment
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy to Railway/Render/Heroku

Update Contact.jsx API URL:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
fetch(`${API_URL}/api/contact`, ...)
```

## Security Checklist
- ✅ Never commit `.env` file
- ✅ Use environment variables for secrets
- ✅ Enable CORS only for your domain
- ✅ Use HTTPS in production
- ✅ Validate all user inputs

## Testing
```bash
# Test contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```
