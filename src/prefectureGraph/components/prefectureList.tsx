import React from "react";
import useFetchPrefectures from "../hooks/useFetchPrefectures.ts";
interface PrefectureListProps {
  onSelectPrefecture: (prefCode: number) => void;
}
const PrefectureList: React.FC<PrefectureListProps> = ({
  onSelectPrefecture,
}) => {
  const { prefectures, error } = useFetchPrefectures();

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {prefectures.map((prefecture) => (
          <label key={prefecture.prefCode}>
            <input
              type="checkbox"
              onChange={() => onSelectPrefecture(prefecture.prefCode)}
            />
            {prefecture.prefName}
          </label>
        ))}
      </ul>
    </div>
  );
};

export default PrefectureList;
