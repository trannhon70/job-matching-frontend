import cookie from "cookie";

export const setCookie = (name: string, value: string): void => {
  const options = {
    path: "/", // Set the cookie path as needed
    // other options like 'expires', 'secure', etc.
  };
  document.cookie = cookie.serialize(name, value, options);
};

export const getCookie = (name: string): string | null => {
  const cookies = cookie.parse(document.cookie);
  return cookies[name] || null;
};

export const clearCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
