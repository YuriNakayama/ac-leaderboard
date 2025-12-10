"use client";

import { useScoreStore } from "@/lib/store";
import { validateCsvData } from "@/lib/validation";
import Link from "next/link";
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

        // すべてのスコアを追加
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-black">AC Leaderboard</h1>
            <Link
              href="/scoreboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              スコアボードに戻る
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">スコアのアップロード</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-black">CSVファイル形式</h3>
            <p className="text-sm text-black mb-2">
              以下の形式のCSVファイルをアップロードしてください:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <code className="text-sm text-black">
                participantName,score
                <br />
                山田太郎,0.9234
                <br />
                佐藤花子,0.8765
              </code>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="csv-file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CSVファイルを選択
            </label>
            <input
              type="file"
              id="csv-file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          {file && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                選択されたファイル: <span className="font-medium">{file.name}</span>
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-sm font-semibold text-red-800 mb-2">
                エラーが発生しました:
              </h4>
              <ul className="list-disc list-inside text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                スコアのアップロードに成功しました！スコアボードに戻ります...
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading || success}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? "アップロード中..." : "アップロード"}
          </button>
        </div>
      </main>
    </div>
  );
}
