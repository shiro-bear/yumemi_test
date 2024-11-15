import React, { useState } from "react";
import useFetchPrefectures from "../hooks/useFetchPrefectures.ts";
import "../css/prefectureList.css"; // CSSファイルをインポート
interface PrefectureListProps {
  onSelectPrefecture: (prefCode: number[]) => void;
}
const PrefectureList: React.FC<PrefectureListProps> = ({
  onSelectPrefecture,
}) => {
  const { prefectures, error } = useFetchPrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const handleCheckboxChange = (prefCode: number, isChecked: boolean) => {
    const updatedList = isChecked
      ? [...selectedPrefectures, prefCode] // チェックが入った場合追加
      : selectedPrefectures.filter((code) => code !== prefCode); // チェックが外れた場合削除
    onSelectPrefecture(updatedList);
    setSelectedPrefectures(updatedList);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul className="prefecture-list">
        {prefectures.map((prefecture) => (
          <label key={prefecture.prefCode} className="prefecture-item">
            <input
              type="checkbox"
              className="prefecture-checkbox"
              onChange={(e) =>
                handleCheckboxChange(prefecture.prefCode, e.target.checked)
              }
            />
            <span className="prefecture-label">
              {`${prefecture.prefCode}. ${prefecture.prefName}`}
            </span>
          </label>
        ))}
      </ul>
    </div>
  );
};

export default PrefectureList;
