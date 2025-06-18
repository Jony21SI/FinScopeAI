# Auth0 Setup Guide

## Overview

Your Auth0 with JWT implementation has been configured but requires environment variables to be set up properly.

## Backend Configuration

### Required Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Auth0 Configuration
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-api-identifier
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=finscopedb
```

### Auth0 Application Setup

1. Go to your Auth0 Dashboard
2. Create a new **Machine to Machine** application
3. Authorize it to access your API
4. Copy the Client ID and Client Secret
5. Set the appropriate scopes (e.g., `read:users`, `write:users`)

### Auth0 API Setup

1. Create a new API in Auth0 Dashboard
2. Set the identifier (this will be your `AUTH0_AUDIENCE`)
3. Enable RS256 signing algorithm
4. Add the scopes you need

## Frontend Configuration

### Required Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3001'
AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
AUTH0_AUDIENCE='your-api-identifier'
AUTH0_SCOPE='openid profile email read:users'
```

### Generate AUTH0_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -hex 32
```

### Auth0 Application Setup (Frontend)

1. Create a new **Single Page Application** in Auth0
2. Set the Allowed Callback URLs: `http://localhost:3001/api/auth/callback`
3. Set the Allowed Logout URLs: `http://localhost:3001`
4. Set the Allowed Web Origins: `http://localhost:3001`
5. Copy the Client ID and Client Secret

## Implementation Details

### Backend Changes Made:

1. ✅ JWT Strategy configured with Auth0 JWKS
2. ✅ JWT Auth Guard with public route support
3. ✅ Global JWT protection for all routes
4. ✅ Public decorator for unprotected routes
5. ✅ User service with findOrCreate method
6. ✅ Protected controller for testing

### Frontend Changes Made:

1. ✅ Auth0 client configuration
2. ✅ Middleware for route protection
3. ✅ Access token retrieval
4. ✅ API call with JWT token

## Testing the Implementation

### 1. Start the Backend

```bash
cd backend
npm install
npm run start:dev
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Test Authentication

1. Navigate to `http://localhost:3001`
2. Click login/logout buttons
3. Try accessing protected routes
4. Check the `/protected` endpoint

## Common Issues and Solutions

### Issue: "Invalid token" errors

- Ensure `AUTH0_AUDIENCE` matches between frontend and backend
- Verify the token is being sent as Bearer token
- Check that the API is configured with RS256 signing

### Issue: "User not found" errors

- Ensure the User entity has the correct fields
- Check that the database is running and accessible
- Verify the `findOrCreate` method is working

### Issue: CORS errors

- Add CORS configuration to your NestJS app
- Ensure the frontend URL is allowed in Auth0 settings

## Security Best Practices

1. **Never commit `.env` files** - they're already in `.gitignore`
2. **Use environment-specific configurations** for production
3. **Rotate secrets regularly**
4. **Use HTTPS in production**
5. **Implement proper error handling**
6. **Add rate limiting for API endpoints**

## Next Steps

1. Set up the environment variables as described above
2. Configure your Auth0 application and API
3. Test the authentication flow
4. Add more protected routes as needed
5. Implement role-based access control if required
