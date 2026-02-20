/** @jest-environment node */

import { NextRequest } from "next/server";
import { DELETE, GET, POST } from "../route";

const readDbMock = jest.fn();
const writeDbMock = jest.fn();

jest.mock("@/server/db", () => ({
  readDb: (...args: unknown[]) => readDbMock(...args),
  writeDb: (...args: unknown[]) => writeDbMock(...args)
}));

describe("guest-attempts route", () => {
  beforeEach(() => {
    readDbMock.mockReset();
    writeDbMock.mockReset();
  });

  it("returns attempts", async () => {
    readDbMock.mockResolvedValueOnce({ guestAttempts: [{ id: 1, createdAt: "2026-01-01" }] });

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual([{ id: 1, createdAt: "2026-01-01" }]);
  });

  it("creates attempt", async () => {
    readDbMock.mockResolvedValueOnce({
      guestAttempts: [],
      users: [],
      patients: [],
      consultations: [],
      recordings: [],
      clinicalInsights: []
    });

    const req = new NextRequest("http://localhost/api/guest-attempts", {
      method: "POST",
      body: JSON.stringify({ createdAt: "2026-01-01T00:00:00.000Z" })
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.id).toBe(1);
    expect(writeDbMock).toHaveBeenCalled();
  });

  it("clears attempts", async () => {
    readDbMock.mockResolvedValueOnce({
      guestAttempts: [{ id: 1, createdAt: "2026-01-01" }],
      users: [],
      patients: [],
      consultations: [],
      recordings: [],
      clinicalInsights: []
    });

    const res = await DELETE();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(writeDbMock).toHaveBeenCalled();
  });
});
