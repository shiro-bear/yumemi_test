import React from "react";
import "./App.css";
import PrefectureList from "./prefectureGraph/prefectureList.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県一覧</h1>
        <PrefectureList />
      </header>
    </div>
  );
}

export default App;
