import { patientService } from "@/lib/services/patients";
import { apiRequest } from "@/lib/http";

jest.mock("@/lib/http", () => ({
  apiRequest: jest.fn()
}));

describe("patientService", () => {
  const mockedApiRequest = apiRequest as jest.Mock;

  beforeEach(() => {
    mockedApiRequest.mockReset();
  });

  it("lists patients", async () => {
    mockedApiRequest.mockResolvedValueOnce([]);

    await patientService.list();

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/patients",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("creates patient", async () => {
    const payload = {
      fullName: "Riya Sharma",
      age: 34,
      gender: "Female",
      phone: "9876543210"
    };

    mockedApiRequest.mockResolvedValueOnce({ id: 1, ...payload });
    await patientService.create(payload);

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/patients",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("deletes patient", async () => {
    mockedApiRequest.mockResolvedValueOnce({ success: true });

    await patientService.remove(12);

    expect(mockedApiRequest).toHaveBeenCalledWith(
      "/patients/12",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});
