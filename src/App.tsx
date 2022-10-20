import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthedApp } from "./authed-app";
import { UnauthedApp } from "./unauthed-app";

function App() {
  // 根据是否有 user 返回认证 app 页面或未认证 app 页面
  const { user } = useAuth();
  return <div className="App">{user ? <AuthedApp /> : <UnauthedApp />}</div>;
}

export default App;
