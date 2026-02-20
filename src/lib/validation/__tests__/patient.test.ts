import { validatePatientPayload } from "@/lib/validation/patient";

describe("validatePatientPayload", () => {
  it("accepts a valid payload", () => {
    const result = validatePatientPayload({
      fullName: "Riya Sharma",
      age: 34,
      gender: "Female",
      phone: "+1 (415) 555-1212",
      address: "Bengaluru",
      aadhaar: "1234-5678-9012",
      mrn: "MRN-1001"
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBe("+14155551212");
      expect(result.data.fullName).toBe("Riya Sharma");
    }
  });

  it("rejects invalid age", () => {
    const result = validatePatientPayload({
      fullName: "Riya Sharma",
      age: 999,
      gender: "Female",
      phone: "9876543210"
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Age");
    }
  });

  it("rejects invalid phone number", () => {
    const result = validatePatientPayload({
      fullName: "Riya Sharma",
      age: 34,
      gender: "Female",
      phone: "invalid"
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Phone");
    }
  });

  it("normalizes optional empty fields to undefined", () => {
    const result = validatePatientPayload({
      fullName: "Riya Sharma",
      age: "34",
      gender: "Female",
      phone: "9876543210",
      address: "   ",
      aadhaar: "",
      mrn: ""
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.address).toBeUndefined();
      expect(result.data.aadhaar).toBeUndefined();
      expect(result.data.mrn).toBeUndefined();
    }
  });
});
