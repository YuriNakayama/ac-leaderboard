export type User = {
  id: string;
  username: string;
  email: string;
  role: "participant" | "admin";
  groups?: string[];
};

export type AuthUser = {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string;
  };
};

export type SignUpParams = {
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type ResetPasswordParams = {
  email: string;
};

export type ConfirmResetPasswordParams = {
  email: string;
  code: string;
  newPassword: string;
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
