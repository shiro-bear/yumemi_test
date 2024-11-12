import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchPopulation from "../hooks/useFetchPopulation.ts";
import "./../css/populationGraph.css";

const PopulationGraph: React.FC<{ selectedPrefectures: number[] }> = ({
  selectedPrefectures,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string>("総人口");
  const { populationData } = useFetchPopulation(
    selectedPrefectures,
    selectedLabel
  );

  const getChartOptions = () => {
    if (!populationData || populationData.length === 0) return {};

    const labels = populationData[0].data.map((item) => item.year);

    return {
      chart: {
        type: "line",
        backgroundColor: "transparent", // 背景色を透明に
      },
      title: {
        text: `${selectedLabel}の推移`,
      },
      xAxis: {
        categories: labels,
      },
      yAxis: {
        title: {
          text: "人口数",
        },
      },
      series: populationData.map((data) => ({
        name: `${data.prefCode}`, // データごとに都道府県名を指定
        data: data.data.map((item) => item.value),
      })),
    };
  };

  return (
    <div className="population-graph-container">
      <h2>人口構成グラフ</h2>
      <div className="button-container">
        <button
          onClick={() => setSelectedLabel("総人口")}
          className={selectedLabel === "総人口" ? "selected" : ""}
        >
          総人口
        </button>
        <button
          onClick={() => setSelectedLabel("年少人口")}
          className={selectedLabel === "年少人口" ? "selected" : ""}
        >
          年少人口
        </button>
        <button
          onClick={() => setSelectedLabel("生産年齢人口")}
          className={selectedLabel === "生産年齢人口" ? "selected" : ""}
        >
          生産年齢人口
        </button>
        <button
          onClick={() => setSelectedLabel("老年人口")}
          className={selectedLabel === "老年人口" ? "selected" : ""}
        >
          老年人口
        </button>
      </div>
      {populationData && (
        <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
      )}
    </div>
  );
};

export default PopulationGraph;
