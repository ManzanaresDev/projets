// client/src/services/auth.services.js

export async function registerUser(userData) {
  const host = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${host}/users/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la connexion");
  }

  return await response.json();
}

export async function loginUser(userData) {
  const host = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${host}/users/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la connexion");
  }
  return await response.json();
}

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
