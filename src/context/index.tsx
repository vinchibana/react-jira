import { AuthProvider } from "./auth-context";
import { ReactNode } from "react";
import React from "react";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider children={children} />;
};
