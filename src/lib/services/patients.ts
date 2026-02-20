import { apiRequest } from "@/lib/http";
import type { Patient } from "@/lib/types";

export type CreatePatientInput = {
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address?: string;
  aadhaar?: string;
  mrn?: string;
};

export type UpdatePatientInput = CreatePatientInput;

export const patientService = {
  list: () =>
    apiRequest<Patient[]>("/patients", {
      method: "GET",
      cache: "no-store"
    }),
  create: (input: CreatePatientInput) =>
    apiRequest<Patient>("/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }),
  update: (id: number, input: UpdatePatientInput) =>
    apiRequest<Patient>(`/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }),
  remove: (id: number) =>
    apiRequest<{ success: boolean }>(`/patients/${id}`, {
      method: "DELETE"
    })
};
