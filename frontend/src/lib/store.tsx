"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Score, ScoreUpdate, User } from "./types";

type ScoreStore = {
  scores: Score[];
  currentUser: User | null;
  addScore: (scoreUpdate: ScoreUpdate) => void;
  updateScore: (id: string, scoreUpdate: ScoreUpdate) => void;
  setScores: (scores: Score[]) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const ScoreContext = createContext<ScoreStore | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [scores, setScoresState] = useState<Score[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addScore = useCallback((scoreUpdate: ScoreUpdate) => {
    const newScore: Score = {
      id: crypto.randomUUID(),
      participantName: scoreUpdate.participantName,
      score: scoreUpdate.score,
      submittedAt: new Date(),
    };
    setScoresState((prev) => [...prev, newScore]);
  }, []);

  const updateScore = useCallback((id: string, scoreUpdate: ScoreUpdate) => {
    setScoresState((prev) =>
      prev.map((score) =>
        score.id === id
          ? {
              ...score,
              participantName: scoreUpdate.participantName,
              score: scoreUpdate.score,
            }
          : score
      )
    );
  }, []);

  const setScores = useCallback((newScores: Score[]) => {
    setScoresState(newScores);
  }, []);

  const login = useCallback((username: string, password: string) => {
    // シンプルなデモ認証
    if (username === "admin" && password === "admin") {
      setCurrentUser({
        id: "1",
        username: "admin",
        role: "admin",
      });
      return true;
    } else if (username === "participant" && password === "participant") {
      setCurrentUser({
        id: "2",
        username: "participant",
        role: "participant",
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        scores,
        currentUser,
        addScore,
        updateScore,
        setScores,
        login,
        logout,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export function useScoreStore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScoreStore must be used within ScoreProvider");
  }
  return context;
}
