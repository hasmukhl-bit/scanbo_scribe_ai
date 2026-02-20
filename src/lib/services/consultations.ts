import { apiRequest } from "@/lib/http";
import type { Consultation } from "@/lib/types";

export const consultationService = {
  list: () =>
    apiRequest<Consultation[]>("/consultations", {
      method: "GET",
      cache: "no-store"
    })
};
