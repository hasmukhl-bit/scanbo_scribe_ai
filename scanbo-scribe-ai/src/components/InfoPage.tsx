import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

const HeaderStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1)
}));

const CardGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  }
}));

const InfoCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1]
}));

const CardTitle = styled(Typography)(() => ({
  fontWeight: 600
}));

const CardBody = styled(Typography)(() => ({
  marginTop: 8
}));

const FooterNote = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2)
}));

export type InfoCardData = {
  title: string;
  body: string;
};

type InfoPageProps = {
  heading: string;
  subheading: string;
  cards: InfoCardData[];
  footer?: string;
};

export default function InfoPage({ heading, subheading, cards, footer }: InfoPageProps) {
  return (
    <Stack spacing={3}>
      <HeaderStack>
        <Typography variant="h5">{heading}</Typography>
        <Typography variant="body1" color="text.secondary">
          {subheading}
        </Typography>
      </HeaderStack>

      <CardGrid>
        {cards.map((card) => (
          <InfoCard key={card.title}>
            <CardTitle variant="subtitle1">{card.title}</CardTitle>
            <CardBody variant="body2" color="text.secondary">
              {card.body}
            </CardBody>
          </InfoCard>
        ))}
      </CardGrid>

      {footer ? (
        <FooterNote variant="body2">{footer}</FooterNote>
      ) : null}
    </Stack>
  );
}
