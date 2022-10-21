import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { SearchPanel } from "./screens/project-list/search-panel";

export const AuthedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>退出登录</button>
      <ProjectListScreen />
    </div>
  );
};
