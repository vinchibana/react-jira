import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import React from "react";

export const UnauthedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
