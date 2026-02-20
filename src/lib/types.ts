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

export type Recording = {
  id: string;
  initials: string;
  name: string;
  dob: string;
  age: number;
  sex: "M" | "F";
  date: string;
  duration: string;
  clinician: string;
  summary: string;
  hpi: string[];
};
