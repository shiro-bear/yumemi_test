import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchPopulation from "../hooks/useFetchPopulation.ts"; // カスタムフックをインポート

const PopulationGraph: React.FC<{ selectedPrefecture: number | null }> = ({
  selectedPrefecture,
}) => {
  const { populationData, selectedLabel, setSelectedLabel } =
    useFetchPopulation(selectedPrefecture);

  const getChartOptions = () => {
    if (!populationData) return {};

    const labels = populationData[0].data.map((item: any) => item.year);
    const dataValues = populationData.find(
      (item: any) => item.label === selectedLabel
    ).data;

    return {
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
      series: [
        {
          name: selectedLabel,
          data: dataValues.map((item: any) => item.value),
        },
      ],
    };
  };

  return (
    <div>
      <h2>人口構成グラフ</h2>
      <div>
        <button onClick={() => setSelectedLabel("総人口")}>総人口</button>
        <button onClick={() => setSelectedLabel("年少人口")}>年少人口</button>
        <button onClick={() => setSelectedLabel("生産年齢人口")}>
          生産年齢人口
        </button>
        <button onClick={() => setSelectedLabel("老年人口")}>老年人口</button>
      </div>
      {populationData && (
        <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
      )}
    </div>
  );
};

export default PopulationGraph;
