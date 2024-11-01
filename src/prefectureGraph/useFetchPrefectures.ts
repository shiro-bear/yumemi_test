// useFetchPrefectures.ts
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures";
const API_KEY = "8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ";

// 都道府県の型を定義
interface Prefecture {
  prefCode: number;
  prefName: string;
}

// フックの戻り値の型を定義
interface UseFetchPrefecturesResult {
  prefectures: Prefecture[];
  error: string | null;
}

const useFetchPrefectures = (): UseFetchPrefecturesResult => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await axios.get<{ result: Prefecture[] }>(API_URL, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });
        setPrefectures(response.data.result);
      } catch (error) {
        console.error("Failed to fetch prefectures:", error);
        setError((error as Error).message);
      }
    };

    fetchPrefectures();
  }, []);

  return { prefectures, error };
};

export default useFetchPrefectures;
