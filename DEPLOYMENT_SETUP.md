# Frontend Deployment & Environment Setup

## ✅ Fixed Issues

### 1. Missing Services Directory
**Problem**: Build failed with `Could not resolve "../../services/api.service.js"`
**Solution**: Created `/src/services/api.service.js` with all API service definitions

### 2. Missing Environment Configuration
**Problem**: Frontend didn't know where backend API was located
**Solution**: Created environment files:
- `.env.local` - Local development (http://localhost:5000/api)
- `.env.production` - Production deployment (https://training-placements.onrender.com/api)

---

## 📋 Environment Files

### .env.local (Development)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### .env.production (Render Deployment)
```
VITE_API_BASE_URL=https://training-placements.onrender.com/api
```

---

## 🚀 Build & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Run dev server (port 5173)
npm run dev

# Build for production
npm run build
```

### Render Deployment

**Frontend** (T-P-Web):
1. Set environment variable in Render dashboard:
   ```
   VITE_API_BASE_URL = https://training-placements.onrender.com/api
   ```
2. Build command: `npm run build`
3. Start command: `npm run preview` (or use static site)

**Backend** (T-P-App):
- Already deployed at: https://training-placements.onrender.com
- Endpoints accessible at: `/api/v1/*`

---

## 🔗 API Integration

### Axios Configuration
All API calls use centralized service:
```javascript
import { authService, studentService, adminService } from '@/services/api.service.js'
```

### Auto-Configured Base URLs
```javascript
authAPI      → ${VITE_API_BASE_URL}/v1/user/auth
adminAPI     → ${VITE_API_BASE_URL}/v1/admin
studentAPI   → ${VITE_API_BASE_URL}/v1/student
practiceAPI  → ${VITE_API_BASE_URL}/v1/practice
```

---

## ✅ Testing

### Local (Development)
```bash
# Backend should be running on: http://localhost:5000
# Frontend will be on: http://localhost:5173
# Proxy configured for /api calls
```

### Production (Render)
Check DevTools Network tab:
- Request URL should be: `https://training-placements.onrender.com/api/v1/user/auth/get-ongoing-tests-info`
- Should return: `200 OK` with data

---

## 🐛 Troubleshooting

### 404 Not Found on /api/v1/...
**Cause**: Frontend doesn't have correct `VITE_API_BASE_URL`
**Fix**: Set environment variable and rebuild

### Building locally fails
**Cause**: Missing .env.local file
**Fix**: Create .env.local with correct API_BASE_URL

### Imports fail during build
**Cause**: src/services/api.service.js missing
**Fix**: ✅ Already created

---

## 📊 Environment Variables Summary

| Env | Value | Purpose |
|-----|-------|---------|
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | Local dev backend |
| `VITE_API_BASE_URL` | `https://training-placements.onrender.com/api` | Production backend |

---

## ✨ Ready for Deployment!

All frontend issues are resolved. The application can now:
- ✅ Build successfully
- ✅ Connect to backend API (local or deployed)
- ✅ Make authenticated requests
- ✅ Handle all endpoints properly
