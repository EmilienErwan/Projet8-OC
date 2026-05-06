import { Property } from "@/types/property";
import { mockProperties } from "@/data/properties";

const SERVER_API_URL = "http://localhost:4000";
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

function getApiBaseUrl() {
  if (typeof window === "undefined") return SERVER_API_URL;
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
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Non autorisé");
  }

  if (!res.ok) throw new Error(`Erreur API ${res.status}`);

  return res.json();
}

export async function getProperties() {
  if (USE_MOCKS) return mockProperties;
  return request<Property[]>("/api/properties");
}

export async function getProperty(id: string) {
  if (USE_MOCKS) {
    const property = mockProperties.find((item) => item.id === id);
    if (!property) throw new Error("Propriété introuvable");
    return property;
  }

  return request<Property>(`/api/properties/${id}`);
}