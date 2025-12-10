export type User = {
  id: string;
  username: string;
  role: "participant" | "admin";
};

export type Score = {
  id: string;
  participantName: string;
  score: number;
  submittedAt: Date;
};

export type ScoreUpdate = {
  participantName: string;
  score: number;
};
