"use client";

import AppLayout from "@/components/AppLayout";
import { useScoreStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScoreboardPage() {
  const { scores, currentUser } = useScoreStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  // スコアを降順でソート
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <AppLayout title="AC Leaderboard">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">スコアボード</h2>
          <p className="card-description">
            総エントリー数: {scores.length}
          </p>
        </div>

        {scores.length === 0 ? (
          <div className="empty-state">
            まだスコアが登録されていません。
            <br />
            CSVファイルをアップロードしてスコアを追加してください。
          </div>
        ) : (
          <div className="table-container">
            <table className="leaderboard-table">
              <thead className="table-head">
                <tr>
                  <th className="table-head-cell">順位</th>
                  <th className="table-head-cell">参加者名</th>
                  <th className="table-head-cell">スコア</th>
                  <th className="table-head-cell">送信日時</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {sortedScores.map((score, index) => (
                  <tr
                    key={score.id}
                    className={`table-row ${index < 3 ? "table-row-top3" : ""}`}
                  >
                    <td className="table-cell table-cell-primary">
                      {index + 1}
                    </td>
                    <td className="table-cell table-cell-secondary">
                      {score.participantName}
                    </td>
                    <td className="table-cell table-cell-secondary">
                      {score.score.toFixed(4)}
                    </td>
                    <td className="table-cell table-cell-muted">
                      {new Date(score.submittedAt).toLocaleString("ja-JP")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
