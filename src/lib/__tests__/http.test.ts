import { apiRequest } from "@/lib/http";

describe("apiRequest", () => {
  const originalFetch = global.fetch;
  const originalBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.NEXT_PUBLIC_API_BASE_URL = originalBase;
    jest.restoreAllMocks();
  });

  it("uses local /api prefix when no base URL is configured", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ ok: true })
    } as Response);

    await apiRequest("/patients", { method: "GET" });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/patients",
      expect.objectContaining({ method: "GET", credentials: "include" })
    );
  });

  it("uses NEXT_PUBLIC_API_BASE_URL when configured", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://example.com/base/";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ ok: true })
    } as Response);

    await apiRequest("patients", { method: "GET" });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/base/patients",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("throws server error messages for failed responses", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: { get: () => "application/json" },
      json: async () => ({ error: "Bad request" })
    } as Response);

    await expect(apiRequest("/patients", { method: "GET" })).rejects.toThrow("Bad request");
  });
});
