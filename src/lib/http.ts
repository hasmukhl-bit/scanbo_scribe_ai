type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

type ApiError = Error & {
  status?: number;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const getApiBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) {
    return "";
  }
  return trimTrailingSlash(raw);
};

const buildApiUrl = (path: string) => {
  const normalizedPath = normalizePath(path);
  const configuredBase = getApiBaseUrl();

  if (!configuredBase) {
    // Local dummy backend via Next.js API routes.
    return `/api${normalizedPath}`;
  }

  return `${configuredBase}${normalizedPath}`;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { headers, ...rest } = options;
  const response = await fetch(buildApiUrl(path), {
    credentials: "include",
    ...rest,
    headers: {
      ...(headers || {})
    }
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const responseBody = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const error = new Error(
      (responseBody as { error?: string } | null)?.error || "Request failed."
    ) as ApiError;
    error.status = response.status;
    throw error;
  }

  return responseBody as T;
}
