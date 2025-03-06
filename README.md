# Warehouse Management System

A modern web application for warehouse management with authentication features.

## Features

- User Authentication (Email/Password and Google Sign-in)
- Protected Dashboard
- Modern UI with animations
- Responsive design
- Real-time updates

## Tech Stack

- React + TypeScript
- Vite
- Firebase Authentication
- Chakra UI
- Framer Motion
- React Router

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd warehouse-management
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google Sign-in)
   - Copy your Firebase configuration
   - Create a `.env` file based on `.env.example` and fill in your Firebase credentials

4. Start the development server:
```bash
npm run dev
```

## Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Replit Deployment
This project is configured for Replit deployment. Simply import the repository into Replit and it will automatically configure the environment.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## License

MIT
