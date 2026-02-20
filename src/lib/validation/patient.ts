export type PatientPayload = {
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address?: string;
  aadhaar?: string;
  mrn?: string;
};

type ValidationResult =
  | { ok: true; data: PatientPayload }
  | { ok: false; error: string };

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const cleanOptional = (value: unknown) => {
  const str = asString(value);
  return str.length > 0 ? str : undefined;
};

export function validatePatientPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid patient payload." };
  }

  const body = input as Record<string, unknown>;

  const fullName = asString(body.fullName);
  const gender = asString(body.gender);
  const phone = asString(body.phone);

  const ageRaw =
    typeof body.age === "number" ? body.age : Number.parseInt(asString(body.age), 10);

  if (fullName.length < 2 || fullName.length > 120) {
    return { ok: false, error: "Full name must be between 2 and 120 characters." };
  }

  if (!Number.isInteger(ageRaw) || ageRaw < 0 || ageRaw > 130) {
    return { ok: false, error: "Age must be an integer between 0 and 130." };
  }

  if (gender.length < 1 || gender.length > 40) {
    return { ok: false, error: "Gender is required." };
  }

  if (!/^\+?[0-9]{7,15}$/.test(phone.replace(/[\s()-]/g, ""))) {
    return { ok: false, error: "Phone number must contain 7 to 15 digits." };
  }

  const normalizedPhone = phone.replace(/[\s()-]/g, "");

  const address = cleanOptional(body.address);
  const aadhaar = cleanOptional(body.aadhaar);
  const mrn = cleanOptional(body.mrn);

  if (address && address.length > 200) {
    return { ok: false, error: "Address must be 200 characters or fewer." };
  }

  if (aadhaar && aadhaar.length > 40) {
    return { ok: false, error: "Aadhaar/ID must be 40 characters or fewer." };
  }

  if (mrn && mrn.length > 80) {
    return { ok: false, error: "MRN must be 80 characters or fewer." };
  }

  return {
    ok: true,
    data: {
      fullName,
      age: ageRaw,
      gender,
      phone: normalizedPhone,
      address,
      aadhaar,
      mrn
    }
  };
}
