export type Patient = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string;
  phone: string;
  address?: string;
  aadhaar?: string;
  mrn?: string;
};

export type NoteStatus = "Review" | "Signed" | "Processing";

export type SoapNote = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type Medication = {
  name: string;
  dose: string;
  frequency: string;
  type: "Current" | "New";
};

export type Consultation = {
  id: number;
  patientId: number;
  startedAt: string;
  /** Legacy field kept for compatibility */
  status: "Draft" | "Final" | "In Progress" | NoteStatus;
  summary: string;
  codes?: string[];
  duration?: string;
  soapNote?: SoapNote;
  medications?: Medication[];
};
