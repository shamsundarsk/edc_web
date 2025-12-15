# Entrepreneurship Development Cell Website

A modern, responsive website built with Next.js, Firebase, and Tailwind CSS.

## 🚨 Quick Fix for Current Error

You're seeing a Firebase service account error. Here's how to fix it:

### 1. Get Your Firebase Service Account
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Project Settings → Service Accounts
3. Click "Generate new private key" (downloads a JSON file)

### 2. Add to Environment Variables
1. Open the downloaded JSON file
2. Copy the entire JSON content
3. Convert it to a single line (remove all line breaks)
4. Add it to your `.env` file:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}
```

### 3. Complete Your .env File
Fill in all the Firebase credentials in your `.env` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Service Account (single line JSON)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Other configurations
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Features

- **Mobile Optimized**: Fully responsive design
- **Interactive Hero**: Beautiful sticker-based design
- **Firebase Powered**: Dynamic content management
- **Admin Panel**: Easy content updates
- **SEO Ready**: Complete optimization

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📞 Support

Contact the Entrepreneurship Development Cell team for assistance.

---

Built with ❤️ by the EDC Team