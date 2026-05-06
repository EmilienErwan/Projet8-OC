import { Property } from "@/types/property";

const SERVER_API_URL = "http://localhost:4000";

function getApiBaseUrl() {
  if (typeof window === "undefined") {
    return SERVER_API_URL;
  }

  return "";
}
export function getImageUrl(path?: string) {
  if (!path || !path.trim()) return "/placeholder.jpg";

  const cleanPath = path.trim();

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  if (cleanPath.startsWith("/")) {
    return `${SERVER_API_URL}${cleanPath}`;
  }

  return "/placeholder.jpg";
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  // 🔥 AJOUT ICI
  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Non autorisé");
  }

  if (!res.ok) {
    throw new Error(`Erreur API ${res.status}`);
  }

  return res.json();
}

export function getProperties() {
  return request<Property[]>("/api/properties");
}

export function getProperty(id: string) {
  return request<Property>(`/api/properties/${id}`);
}
