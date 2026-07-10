const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "API request failed"
    );
  }

  return data;
}

export async function fetchBatches() {

  const response = await fetch(`${BASE_URL}/api/batches`);

  return handleResponse(response);
}

export async function fetchStats() {

  const response = await fetch(`${BASE_URL}/api/stats`);

  return handleResponse(response);
}

export async function fetchAlerts() {

  const response = await fetch(`${BASE_URL}/api/alerts`);

  return handleResponse(response);
}

export async function loginUser(email, password) {

  const response = await fetch(`${BASE_URL}/api/auth/login`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),

  });

  return handleResponse(response);
}