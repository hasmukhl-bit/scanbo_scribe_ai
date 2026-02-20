import { apiRequest } from "@/lib/http";
import type { Recording } from "@/lib/types";

export const recordingService = {
  list: () =>
    apiRequest<Recording[]>("/recordings", {
      method: "GET",
      cache: "no-store"
    }),
  removeMany: (ids: string[]) =>
    apiRequest<{ success: boolean }>("/recordings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids })
    })
};
