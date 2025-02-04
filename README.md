# 🏡 Prime Properties
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A modern property listing platform built with Next.js, MongoDB, and Tailwind CSS. Users can browse, list, and inquire about properties seamlessly.

## 🚀 Live Demo  
[🔗 View the site on Vercel](https://prime-properties-beryl.vercel.app/)

## 🛠 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Next.js Server Actions, MongoDB  
- **Authentication:** NextAuth.js (Google OAuth)  
- **Image Hosting:** Cloudinary  
- **Maps Integration:** MapTiler  
- **Deployment:** Vercel

## 📥 Installation & Setup

1. Clone the repository:
 ```sh
 git clone https://github.com/EleniKotsiri/prime-properties.git
 cd prime-properties
 ```
 
2. Install dependencies:
 ```sh
 npm install
 ```

3. Set up environment variables:
 Create a `.env` file and add the necessary API keys and credentials:
 ```sh
  # Database
  MONGODB_URI=your-mongodb-connection-string
  
  # App Domains
  NEXT_PUBLIC_DOMAIN=your-public-domain
  NEXT_PUBLIC_API_DOMAIN=your-api-domain
  
  # Google OAuth Setup
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  
  # NextAuth Configuration
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_URL_INTERNAL=http://localhost:3000
  NEXTAUTH_SECRET=your-nextauth-secret
  
  # Cloudinary (Image Upload)
  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  
  # MapTiler (Maps Integration)
  NEXT_PUBLIC_MAPTILER_API_KEY=your-maptiler-api-key
 ```

 4. Run the development server:
```sh
npm run dev
```

The app will be available at http://localhost:3000.

## Features
- 🏠 List and browse properties
- 💬 Contact property owners directly
- 🔑 User authentication via Google OAuth (NextAuth.js)
- 📸 Upload and manage images using Cloudinary
- 🗺️ Map integration with MapTiler
- 📩 Messaging system for inquiries
- 📱 Responsive and mobile-friendly design

🚀 Deployment
The app is deployed on Vercel. To deploy your own version:
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in Vercel.
4. Deploy


📌 Contributing
Contributions are welcome! Feel free to fork the repo, open an issue, or submit a pull request.
