import { recordingService } from "@/lib/services/recordings";
import { apiRequest } from "@/lib/http";

jest.mock("@/lib/http", () => ({
  apiRequest: jest.fn()
}));

describe("recordingService", () => {
  const mockedApiRequest = apiRequest as jest.Mock;

  beforeEach(() => {
    mockedApiRequest.mockReset();
  });

  it("lists recordings", async () => {
    mockedApiRequest.mockResolvedValueOnce([]);

    await recordingService.list();

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/recordings",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("removes many recordings", async () => {
    mockedApiRequest.mockResolvedValueOnce({ success: true });

    await recordingService.removeMany(["hv", "rs"]);

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/recordings",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});
