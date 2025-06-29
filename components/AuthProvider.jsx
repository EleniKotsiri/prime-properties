"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children, session }) => {
  return (
    <SessionProvider session={session} key={session?.user?.id || "guest"}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
