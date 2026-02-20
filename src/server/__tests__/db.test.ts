/** @jest-environment node */

const readFileMock = jest.fn();
const writeFileMock = jest.fn();

jest.mock("node:fs", () => ({
  promises: {
    readFile: (...args: unknown[]) => readFileMock(...args),
    writeFile: (...args: unknown[]) => writeFileMock(...args)
  }
}));

describe("server db utils", () => {
  beforeEach(() => {
    jest.resetModules();
    readFileMock.mockReset();
    writeFileMock.mockReset();
  });

  it("reads existing db file", async () => {
    readFileMock.mockResolvedValueOnce(
      JSON.stringify({
        users: [],
        patients: [{ id: 1, fullName: "Riya", age: 30, gender: "F", phone: "9999999999" }],
        consultations: [],
        guestAttempts: [],
        recordings: [],
        clinicalInsights: []
      })
    );

    const { readDb } = await import("@/server/db");
    const db = await readDb();

    expect(db.patients).toHaveLength(1);
    expect(db.patients[0].fullName).toBe("Riya");
  });

  it("seeds and writes db when file is missing", async () => {
    readFileMock.mockRejectedValueOnce(new Error("missing"));

    const { readDb } = await import("@/server/db");
    const db = await readDb();

    expect(writeFileMock).toHaveBeenCalled();
    expect(Array.isArray(db.patients)).toBe(true);
  });
});
