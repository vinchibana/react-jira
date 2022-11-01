import { AuthProvider } from "./auth-context";
import { ReactNode } from "react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <AuthProvider children={children} />
    </Router>
  );
};
