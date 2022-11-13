import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { FullPageLoading } from "./components/lib";

const AuthedApp = React.lazy(() => import("authed-app"));
const UnauthedApp = React.lazy(() => import("unauthed-app"));

function App() {
  // 根据是否有 user 返回认证 app 页面或未认证 app 页面
  const { user } = useAuth();
  return (
    <div className="App">
      <React.Suspense fallback={<FullPageLoading />}>
        {user ? <AuthedApp /> : <UnauthedApp />}
      </React.Suspense>
    </div>
  );
}

export default App;
