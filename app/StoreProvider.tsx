"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initializeAuthState } from "@/lib/features/auth/authSlice";
import axios from "axios";
import Cookies from "js-cookie";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  const token = Cookies.get("auth") || null;

  // Set Authorization header if token is present
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    if (!isClient) {
      return null;
    }

    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeAuthState());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
