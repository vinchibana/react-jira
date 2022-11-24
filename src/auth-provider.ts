import { User } from "./types/user";
const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 从 response.json 中解构 user
export const handelUserResponse = ({ user }: { user: User }) => {
  // 在 application 本地存储中存储登录后的 token
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  // 返回 Promise<User>
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      // const a = await response.json()
      // console.log('a',a)
      // {"user":{"id":177555,"name":"6","token":"MTc3NTU1"}}
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
