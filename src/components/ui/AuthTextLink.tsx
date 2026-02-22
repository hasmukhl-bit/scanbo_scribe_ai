"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";

const AuthTextLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  textUnderlineOffset: "2px",
  fontWeight: 600,
  "&:hover": {
    color: theme.palette.primary.dark,
    textDecoration: "underline"
  },
  "&:focus-visible": {
    textDecoration: "underline"
  }
}));

export default AuthTextLink;
