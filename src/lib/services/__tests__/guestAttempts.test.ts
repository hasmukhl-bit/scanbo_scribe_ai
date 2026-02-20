import { guestAttemptService } from "@/lib/services/guestAttempts";
import { apiRequest } from "@/lib/http";

jest.mock("@/lib/http", () => ({
  apiRequest: jest.fn()
}));

describe("guestAttemptService", () => {
  const mockedApiRequest = apiRequest as jest.Mock;

  beforeEach(() => {
    mockedApiRequest.mockReset();
  });

  it("lists attempts", async () => {
    mockedApiRequest.mockResolvedValueOnce([]);

    await guestAttemptService.list();

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/guest-attempts",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("creates attempt", async () => {
    mockedApiRequest.mockResolvedValueOnce({ id: 1, createdAt: "2026-01-01T00:00:00.000Z" });

    await guestAttemptService.create("2026-01-01T00:00:00.000Z");

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/guest-attempts",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("clears attempts", async () => {
    mockedApiRequest.mockResolvedValueOnce({ success: true });

    await guestAttemptService.clear();

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/guest-attempts",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});
