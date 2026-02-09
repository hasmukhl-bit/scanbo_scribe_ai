"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Slider,
  Stack,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AppShell from "@/components/AppShell";
import { useRouter } from "next/navigation";

const PageGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "340px 1fr",
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr"
  }
}));

const ListPanel = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2)
}));

const PanelHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1)
}));

const PanelActions = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%"
}));

const DeleteWrap = styled(Box)({
  marginLeft: "auto"
});

const SelectAllWrap = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.75)
}));

const SearchField = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: theme.palette.background.default
}));

const RecordingList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.5)
}));

const RecordingCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  display: "grid",
  gridTemplateColumns: "24px 40px 1fr auto",
  gap: theme.spacing(1.5),
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1]
}));

const RecordingItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  padding: 0,
  "&:focus-visible": {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    outlineOffset: 2,
    borderRadius: 14
  }
}));

const RecordingItemCard = styled(RecordingCard, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  borderColor: active ? alpha(theme.palette.primary.main, 0.4) : theme.palette.divider,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.08) : theme.palette.background.paper
}));

const RecordingAvatar = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  fontWeight: 700,
  display: "grid",
  placeItems: "center"
}));

const RecordingMeta = styled(Stack)({
  gap: 2,
  minWidth: 0
});

const RecordingTime = styled(Typography)({
  whiteSpace: "nowrap"
});

const RecordingName = styled(Typography)({
  whiteSpace: "nowrap"
});

const ListCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  color: theme.palette.primary.main
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 10,
  border: "none",
  color: theme.palette.error.main,
  backgroundColor: alpha(theme.palette.error.main, 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

const MainPanel = styled(Box)(({ theme }) => ({
  backgroundColor: "rgb(237 240 242 / var(--tw-bg-opacity, 1))",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2)
}));

const DetailHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2)
}));

const TitleRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

const TitleName = styled(Typography)({
  fontWeight: 700,
  letterSpacing: 0.5
});

const TitleMeta = styled(Typography)({
  fontWeight: 500
});

const ActionRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1)
}));

const SecondaryPill = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 999,
  padding: theme.spacing(0.75, 2.5),
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main
}));

const MediaCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "auto auto",
  gap: theme.spacing(2),
  alignItems: "center"
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2)
  }
}));

const BarRow = styled(Stack)(({ theme }) => ({
  gridColumn: "2 / span 1",
  gridRow: "1",
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
  width: "100%"
}));

const LabelText = styled(Typography)({
  gridColumn: "3",
  gridRow: "1"
});

const ProgressSlider = styled(Slider)(({ theme }) => ({
  width: "100%",
  minWidth: 240,
  color: theme.palette.primary.main,
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#d7dbe0"
  },
  "& .MuiSlider-track": {
    border: "none"
  },
  "& .MuiSlider-thumb": {
    width: 12,
    height: 12
  }
}));

const TimeRow = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
});

const PlayerControls = styled(Stack)(({ theme }) => ({
  gridColumn: "2 / span 2",
  gridRow: "2",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1)
}));

const ControlGroup = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.5)
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`
}));

const SpeedChip = styled(Chip)(({ theme }) => ({
  borderRadius: 10,
  fontWeight: 600,
  height: 28
}));

const MetaRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flexWrap: "wrap"
}));

const MetaChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  fontWeight: 600
}));

const SummaryCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5)
}));

const SectionCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5)
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

const ToggleChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  fontWeight: 600,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.background.default,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary
}));

const ParagraphText = styled(Typography)({
  lineHeight: 1.6
});

const SectionLabel = styled(Typography)({
  fontWeight: 600
});

type Recording = {
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

export default function HomePage() {
  const router = useRouter();
  const initialRecordings: Recording[] = [
    {
      id: "hv",
      initials: "HV",
      name: "Harsh Virdya",
      dob: "Jan 27, 1995",
      age: 30,
      sex: "M",
      date: "Feb 6, 2026, 2:59 PM",
      duration: "10:08 mins",
      clinician: "BakshiMD, Rahul",
      summary:
        "Anna Anderson, a 30-year-old female, presented for follow-up of hypertension, diabetes, COPD, and a history of colon polyps. She reported occasional forgetfulness with her diuretic but denied symptoms of elevated blood pressure. Her blood pressure today was 142/78. She checks fasting blood sugar most days with recent readings between 150–205 mg/dL. She denied chest pain or shortness of breath. On exam, lungs were clear and heart sounds regular. Labs were ordered and a neurology referral was placed for colon polyps follow-up.",
      hpi: [
        "Anna Anderson, a 30-year-old female, presented for a chronic condition follow-up focused on hypertension, diabetes, COPD, and history of colon polyps. She shared that she sometimes forgets to take her hydrochlorothiazide, particularly when anticipating errands that increase urinary urgency. She denied headaches or blurry vision, and her blood pressure today was measured at 152/86.",
        "Regarding her diabetes, she checks fasting blood sugar most days with recent morning readings ranging from 150 to 205 mg/dL. She denied recent symptoms of low blood sugar and recalled her last hypoglycemic episode was last year. She keeps a list of hypoglycemia treatments available at home."
      ]
    },
    {
      id: "rs",
      initials: "RS",
      name: "Riya Sharma",
      dob: "Mar 12, 1992",
      age: 33,
      sex: "F",
      date: "Feb 5, 2026, 11:12 AM",
      duration: "08:42 mins",
      clinician: "Dr. Patel",
      summary:
        "Riya Sharma returned for medication adjustment following hypertension review. She reported improved adherence to amlodipine and decreased dizziness. BP today 130/82 with no new symptoms. Plan includes continued monitoring and repeat labs next visit.",
      hpi: [
        "Patient reports improved adherence with current regimen and fewer episodes of lightheadedness. No chest pain, palpitations, or shortness of breath.",
        "Discussed diet changes and exercise consistency. Patient agreed to track home BP logs."
      ]
    },
    {
      id: "am",
      initials: "AM",
      name: "Arjun Mehta",
      dob: "Aug 9, 1984",
      age: 41,
      sex: "M",
      date: "Feb 4, 2026, 4:45 PM",
      duration: "12:15 mins",
      clinician: "Dr. Singh",
      summary:
        "Arjun Mehta seen for diabetes follow-up. Reports stable fasting sugars with occasional post-prandial spikes. No hypoglycemic events. Plan includes dose timing adjustment and nutrition consult.",
      hpi: [
        "Patient reports fasting sugars averaging 140–160 mg/dL with occasional post-meal elevations. Denies hypoglycemia.",
        "Reviewed medication timing and emphasized balanced carbohydrate intake."
      ]
    },
    {
      id: "nk",
      initials: "NK",
      name: "Neha Kapoor",
      dob: "Nov 18, 1990",
      age: 35,
      sex: "F",
      date: "Feb 3, 2026, 9:05 AM",
      duration: "07:55 mins",
      clinician: "Dr. Iyer",
      summary:
        "Neha Kapoor visited for COPD management. Reports stable symptoms with morning cough only. Lungs clear. Continue current inhaler and follow up in three months.",
      hpi: [
        "Patient reports stable breathing, occasional morning cough, no recent exacerbations.",
        "Medication adherence confirmed; no side effects."
      ]
    },
    {
      id: "mg",
      initials: "MG",
      name: "Mehul Gupta",
      dob: "May 4, 1981",
      age: 44,
      sex: "M",
      date: "Feb 2, 2026, 6:28 PM",
      duration: "09:18 mins",
      clinician: "Dr. Rao",
      summary:
        "Mehul Gupta follow-up for chronic back pain. Pain improved with physiotherapy. Continue exercises and consider imaging if pain worsens.",
      hpi: [
        "Patient reports reduced pain intensity with regular physiotherapy.",
        "Discussed red flags and when to return for imaging."
      ]
    }
  ];

  const [recordings, setRecordings] = React.useState<Recording[]>(initialRecordings);
  const [activeId, setActiveId] = React.useState<string>(initialRecordings[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playbackRate, setPlaybackRate] = React.useState(2);
  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const audioSrc = "/Harsh%20%26%20Kashyap%20Conversation.m4a";

  const filteredRecordings = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return recordings;
    }
    return recordings.filter((recording) =>
      recording.name.toLowerCase().includes(query)
    );
  }, [recordings, searchQuery]);
  const activeRecording = recordings.find((item) => item.id === activeId) ?? null;

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }
    setRecordings((prev) => prev.filter((recording) => !selectedIds.includes(recording.id)));
    setSelectedIds([]);
    if (selectedIds.includes(activeId)) {
      const remaining = recordings.filter((recording) => !selectedIds.includes(recording.id));
      setActiveId(remaining[0]?.id ?? "");
    }
  };

  const allSelected =
    filteredRecordings.length > 0 &&
    filteredRecordings.every((recording) => selectedIds.includes(recording.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !filteredRecordings.some((r) => r.id === id)));
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      filteredRecordings.forEach((recording) => next.add(recording.id));
      return Array.from(next);
    });
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    audio.pause();
  };

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) {
      return;
    }
    const nextTime = Array.isArray(value) ? value[0] : value;
    audio.currentTime = Math.max(0, Math.min(duration, nextTime));
    setCurrentTime(nextTime);
  };

  const handleSkip = (amount: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = Math.max(0, Math.min(duration || audio.duration, audio.currentTime + amount));
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSetRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = "Harsh & Kashyap Conversation.m4a";
    link.click();
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.playbackRate = playbackRate;
    audio.muted = isMuted;
  }, [playbackRate, isMuted]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, [activeId]);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.currentTarget;
    const nextTime = audio.currentTime;
    setCurrentTime(nextTime);
    if (!duration && Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
  };

  return (
    <AppShell title="My Recording" subtitle="" active="home">
      <PageGrid>
        <ListPanel>
          <PanelHeader>
            <PanelActions>
              <SelectAllWrap>
                <ListCheckbox
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  inputProps={{ "aria-label": "Select all recordings" }}
                />
                <Typography variant="caption" color="text.secondary">
                  Select all
                </Typography>
              </SelectAllWrap>
              {selectedIds.length > 0 ? (
                <DeleteWrap>
                  <DeleteButton size="small" onClick={handleDeleteSelected}>
                    <DeleteOutlineIcon fontSize="small" />
                  </DeleteButton>
                </DeleteWrap>
              ) : null}
            </PanelActions>
          </PanelHeader>

          <SearchField
            fullWidth
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
          />

          <RecordingList>
            {filteredRecordings.map((recording) => (
              <RecordingItem
                key={recording.id}
                active={recording.id === activeId}
                role="button"
                tabIndex={0}
                onClick={() => setActiveId(recording.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(recording.id);
                  }
                }}
              >
                <RecordingItemCard active={recording.id === activeId}>
                  <ListCheckbox
                    checked={selectedIds.includes(recording.id)}
                    onClick={(event) => event.stopPropagation()}
                    onChange={() => toggleSelected(recording.id)}
                    inputProps={{ "aria-label": `Select ${recording.name}` }}
                  />
                  <RecordingAvatar>{recording.initials}</RecordingAvatar>
                  <RecordingMeta>
                    <RecordingName variant="body2">{recording.name}</RecordingName>
                    <RecordingTime variant="caption" color="text.secondary">
                      {recording.date}
                    </RecordingTime>
                  </RecordingMeta>
                  <IconButton size="small">
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>
                </RecordingItemCard>
              </RecordingItem>
            ))}
          </RecordingList>
        </ListPanel>

        <MainPanel>
          <DetailHeader>
            <TitleRow>
              <TitleName variant="h6">
                {activeRecording ? activeRecording.name : "Select a recording"}
              </TitleName>
              {activeRecording ? (
                <TitleMeta variant="body2" color="text.secondary">
                   {activeRecording.dob} ({activeRecording.age}Y {activeRecording.sex})
                </TitleMeta>
              ) : null}
            </TitleRow>
            <ActionRow>
              <SecondaryPill onClick={() => router.push("/start-consult")}>
                Start New Consult
              </SecondaryPill>
            </ActionRow>
          </DetailHeader>

          {activeRecording ? (
            <>
              <MediaCard>
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  preload="metadata"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                  onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                <PlayButton onClick={handleTogglePlay}>
                  {isPlaying ? (
                    <PauseRoundedIcon fontSize="medium" />
                  ) : (
                    <PlayArrowRoundedIcon fontSize="medium" />
                  )}
                </PlayButton>
                <BarRow>
                  <ProgressSlider
                    value={Math.min(currentTime, Math.max(duration, currentTime, 1))}
                    min={0}
                    max={Math.max(duration, currentTime, 1)}
                    step={0.1}
                    disabled={Math.max(duration, currentTime) === 0}
                    onChange={handleSliderChange}
                  />
                  <TimeRow>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(currentTime)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(Math.max(duration, currentTime))}
                    </Typography>
                  </TimeRow>
                </BarRow>
                <PlayerControls>
                  <ControlGroup>
                    <ControlButton size="small" onClick={() => handleSkip(-10)}>
                      <Replay10RoundedIcon fontSize="small" />
                    </ControlButton>
                    <ControlButton size="small" onClick={() => handleSkip(10)}>
                      <Forward10RoundedIcon fontSize="small" />
                    </ControlButton>
                  </ControlGroup>
                  <ControlGroup>
                    <SpeedChip label="2.0x" variant="outlined" onClick={() => handleSetRate(2)} />
                    <ControlButton size="small" onClick={handleToggleMute}>
                      <VolumeUpOutlinedIcon fontSize="small" />
                    </ControlButton>
                    <ControlButton size="small" onClick={handleDownload}>
                      <DownloadOutlinedIcon fontSize="small" />
                    </ControlButton>
                  </ControlGroup>
                </PlayerControls>
              </MediaCard>
              <SummaryCard>
                <MetaRow>
                  <MetaChip label={activeRecording.date} />
                  <MetaChip label={activeRecording.duration} />
                  <MetaChip label={activeRecording.clinician} />
                </MetaRow>

                <Divider />

                <Typography variant="subtitle1">Conversation Summary</Typography>
                <ParagraphText variant="body2" color="text.secondary">
                  {activeRecording.summary}
                </ParagraphText>
              </SummaryCard>

              <SectionCard>
                <SectionHeader>
                  <Typography variant="subtitle1">Subjective</Typography>
                  <ToggleChip label="Simple" />
                  <ToggleChip label="Standard" />
                  <ToggleChip active label="Detailed" />
                </SectionHeader>

                <Divider />

                <Typography variant="subtitle2">HPI</Typography>
                {activeRecording.hpi.map((paragraph) => (
                  <ParagraphText key={paragraph} variant="body2" color="text.secondary">
                    {paragraph}
                  </ParagraphText>
                ))}
              </SectionCard>
            </>
          ) : (
            <SectionCard>
              <Typography variant="subtitle1">Select a recording</Typography>
              <Typography variant="body2" color="text.secondary">
                Choose a patient encounter from the list to review the generated notes.
              </Typography>
            </SectionCard>
          )}
        </MainPanel>
      </PageGrid>
    </AppShell>
  );
}
