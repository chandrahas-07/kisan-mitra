const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
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