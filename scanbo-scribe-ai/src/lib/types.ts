export type Patient = {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address?: string;
  aadhaar?: string;
  mrn?: string;
};

export type Consultation = {
  id: number;
  patientId: number;
  startedAt: string;
  status: "Draft" | "Final" | "In Progress";
  summary: string;
};
