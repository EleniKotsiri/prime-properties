// contains the provider configuration (Google in this case), callbacks, and other settings.
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],

  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      console.log("SignIn Callback - Profile:", profile);
      try {
        // 1. Connect to the database
        await connectDB();
        // 2. Check if user exists already
        const userExists = await User.findOne({ email: profile.email });
        console.log("SignIn Callback - User Exists:", userExists); // Debug log for existing user
        // 3. If not, create user
        if (!userExists) {
          // Truncate username if it's too long
          const username = profile.name.slice(0, 20);

          const newUser = await User.create({
            email: profile.email,
            username,
            image: profile.picture
          });

          console.log("SignIn Callback - New User Created:", newUser); // Debug log for new user
        }
        // 4. Return true to allow sign in
        return true;

      } catch (error) {
        console.error("SignIn Callback - Error:", error); // Log any errors
        return false; // Prevent sign-in on error
      }
    },
    
    // Session callback function that modifies the session object
    async session({ session }) {
      console.log("Session Callback - Session:", session); // Debug log for session
      try {
        // 1. Get the user from database
        const user = await User.findOne({ email: session.user.email });
        console.log("Session Callback - User Found:", user); // Debug log for user
        // 2. Assign user id from the session
        session.user.id = user._id.toString();
        // 3. Return the session
        return session;

      } catch (error) {
        console.error("Session Callback - Error:", error); // Log any errors
        return session; // Return the session even if there's an error
      }
    }
  }
};