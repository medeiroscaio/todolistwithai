export const localURL = "18.224.67.75"; // ou "52.91.123.45", ou "api.meudominio.com"

const api = axios.create({
  baseURL: `http://${localURL}:5000/`,
  withCredentials: true,
});

export default api;
