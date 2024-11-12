import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PopulationGraph from "./populationGraph.tsx";
import useFetchPopulation from "../hooks/useFetchPopulation";
import HighchartsReact from "highcharts-react-official";

// useFetchPopulationのモック
jest.mock("../hooks/useFetchPopulation");

describe("PopulationGraph Component", () => {
  const mockData = [
    {
      prefCode: 1,
      data: [
        { year: 2020, value: 5000000 },
        { year: 2021, value: 5100000 },
      ],
    },
  ];

  beforeEach(() => {
    (useFetchPopulation as jest.Mock).mockReturnValue({
      populationData: mockData,
    });
  });

  it("renders component title", () => {
    render(<PopulationGraph selectedPrefectures={[1]} />);
    expect(screen.getByText("人口構成グラフ")).toBeInTheDocument();
  });

  it("renders buttons for each population label", () => {
    render(<PopulationGraph selectedPrefectures={[1]} />);
    expect(screen.getByText("総人口")).toBeInTheDocument();
    expect(screen.getByText("年少人口")).toBeInTheDocument();
    expect(screen.getByText("生産年齢人口")).toBeInTheDocument();
    expect(screen.getByText("老年人口")).toBeInTheDocument();
  });

  it("changes selectedLabel state when buttons are clicked", () => {
    render(<PopulationGraph selectedPrefectures={[1]} />);
    const totalPopulationButton = screen.getByText("総人口");
    const youngPopulationButton = screen.getByText("年少人口");

    // "総人口"が最初に選択されている
    expect(totalPopulationButton).toHaveClass("selected");

    // "年少人口"ボタンをクリック
    fireEvent.click(youngPopulationButton);
    expect(youngPopulationButton).toHaveClass("selected");
  });

  it("renders HighchartsReact component with data", () => {
    render(<PopulationGraph selectedPrefectures={[1]} />);

    // グラフのレンダリングを確認
    expect(screen.getByText("人口数")).toBeInTheDocument();
    expect(HighchartsReact).toBeTruthy();
  });

  it("displays correct title based on selectedLabel", () => {
    render(<PopulationGraph selectedPrefectures={[1]} />);

    // "総人口の推移"が表示されていることを確認
    expect(screen.getByText("総人口の推移")).toBeInTheDocument();

    // "年少人口"を選択してタイトルが変わるか確認
    const youngPopulationButton = screen.getByText("年少人口");
    fireEvent.click(youngPopulationButton);
    expect(screen.getByText("年少人口の推移")).toBeInTheDocument();
  });
});
