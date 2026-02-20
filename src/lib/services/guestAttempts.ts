import { apiRequest } from "@/lib/http";

export type GuestAttempt = {
  id: number;
  createdAt: string;
};

export const guestAttemptService = {
  list: () =>
    apiRequest<GuestAttempt[]>("/guest-attempts", {
      method: "GET",
      cache: "no-store"
    }),
  create: (createdAt?: string) =>
    apiRequest<GuestAttempt>("/guest-attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ createdAt: createdAt || new Date().toISOString() })
    }),
  clear: () =>
    apiRequest<{ success: boolean }>("/guest-attempts", {
      method: "DELETE"
    })
};
