import React, { useState } from "react";
import "./App.css";
import PrefectureList from "./prefectureGraph/components/prefectureList.tsx";
import PopulationGraph from "./prefectureGraph/components/populationGraph.tsx";

function App() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  const handlePrefectureSelect = (prefCodes: number[]) => {
    setSelectedPrefectures(prefCodes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県一覧</h1>
        <PrefectureList onSelectPrefecture={handlePrefectureSelect} />
        <PopulationGraph selectedPrefectures={selectedPrefectures} />
      </header>
    </div>
  );
}

export default App;
