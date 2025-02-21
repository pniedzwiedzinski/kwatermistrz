"use client";
import React, { createContext, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthContext = createContext({});

export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};

import { ReactNode } from "react";

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const clientId =
    "165876631351-uro880lnu87bs534iitu6b8ptq8e0ume.apps.googleusercontent.com"; // Replace with your Google client ID

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleAuthContext.Provider value={{}}>
        {children}
      </GoogleAuthContext.Provider>
    </GoogleOAuthProvider>
  );
}
