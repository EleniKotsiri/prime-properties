'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

// Create Context
const GlobalContext = createContext();

// Create Provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  // Get user session
  const { data: session } = useSession();

  // Get the messages only if the user is logged in
  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [session]);


  return (
    <GlobalContext.Provider value={{
      unreadCount,
      setUnreadCount
    }}> 
      { children }
    </GlobalContext.Provider>
  );
}

// Custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}