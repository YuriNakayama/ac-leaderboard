"use client";

import AppLayout from "@/components/AppLayout";
import { useScoreStore } from "@/lib/store";
import { validateCsvData } from "@/lib/validation";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const { currentUser, addScore } = useScoreStore();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors([]);
      setSuccess(false);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrors(["ファイルを選択してください"]);
      return;
    }

    setUploading(true);
    setErrors([]);
    setSuccess(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validation = validateCsvData(results.data);

        if (!validation.valid) {
          setErrors(validation.errors);
          setUploading(false);
          return;
        }

        // すべてのスコアを追加（リアルタイム更新）
        validation.validData.forEach((scoreUpdate) => {
          addScore(scoreUpdate);
        });

        setSuccess(true);
        setUploading(false);
        setFile(null);

        // 2秒後にスコアボードに戻る
        setTimeout(() => {
          router.push("/scoreboard");
        }, 2000);
      },
      error: (error) => {
        setErrors([`CSVファイルの解析に失敗しました: ${error.message}`]);
        setUploading(false);
      },
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <AppLayout title="AC Leaderboard" showBackButton>
      <div className="card" style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <div style={{ padding: "1.5rem" }}>
          <h2 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            スコアのアップロード
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className="card-title" style={{ marginBottom: "0.5rem" }}>
              CSVファイル形式
            </h3>
            <p className="text-sm" style={{ marginBottom: "0.5rem" }}>
              以下の形式のCSVファイルをアップロードしてください:
            </p>
            <div
              style={{
                backgroundColor: "var(--secondary-50)",
                padding: "1rem",
                borderRadius: "var(--border-radius)",
              }}
            >
              <code className="text-sm">
                participantName,score
                <br />
                山田太郎,0.9234
                <br />
                佐藤花子,0.8765
              </code>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="csv-file" className="form-label">
              CSVファイルを選択
            </label>
            <input
              type="file"
              id="csv-file"
              accept=".csv"
              onChange={handleFileChange}
              className="form-input"
              style={{ cursor: "pointer" }}
            />
          </div>

          {file && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="text-sm text-muted">
                選択されたファイル: <span style={{ fontWeight: 500 }}>{file.name}</span>
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="alert alert-error">
              <h4 className="alert-error-title">エラーが発生しました:</h4>
              <ul className="alert-error-list">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <p className="alert-success-text">
                スコアのアップロードに成功しました！スコアボードに戻ります...
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading || success}
            className="btn btn-success"
            style={{ width: "100%", padding: "0.75rem 1rem" }}
          >
            {uploading ? "アップロード中..." : "アップロード"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
