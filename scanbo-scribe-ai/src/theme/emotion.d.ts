import "@emotion/react";
import type { Theme } from "@mui/material/styles";

declare module "@emotion/react" {
  export interface Theme extends Theme {}
}
