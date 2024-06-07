import {
  RegisterData,
  LoginData,
  AuthResponse,
  UpdatePasswordData,
} from "../types/dataTypes";

//defined parameter types in dataTypes.ts
// fn takes arg of defined typr and returns Promise which resolves to AuthResponse type
//use of Promise --> an obj rep eventual comp of async op and its resulting value

export const registerUser = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
};

export const loginUser = async (userData: LoginData): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to logout user");
  }
  return response.json();
};

export const updatePassword = async (
  newPasswordData: UpdatePasswordData
  // token: string
): Promise<void> => {
  const response = await fetch("/api/auth/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    credentials: "include", //include res.cookies in req
    body: JSON.stringify(newPasswordData),
  });
  if (!response.ok) {
    throw new Error("Failed to update password");
  }
  return response.json();
};
