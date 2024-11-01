import React from "react";
import useFetchPrefectures from "./useFetchPrefectures.ts";

const PrefectureList: React.FC = () => {
  const { prefectures, error } = useFetchPrefectures();

  return (
    <div>
      <h2>都道府県一覧</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>{prefecture.prefName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrefectureList;
