import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PrefectureList from "../components/prefectureList.tsx";
import useFetchPrefectures from "../hooks/useFetchPrefectures";
import axios from "axios";

// useFetchPrefecturesをモック
jest.mock("../hooks/useFetchPrefectures");
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })), // axiosをモック
}));

describe("PrefectureList", () => {
  const mockOnSelectPrefecture = jest.fn();

  beforeEach(() => {
    mockOnSelectPrefecture.mockClear(); // テスト前にモック関数をリセット
  });

  it("should render the list of prefectures", async () => {
    // useFetchPrefecturesのモック
    (useFetchPrefectures as jest.Mock).mockReturnValue({
      prefectures: [
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Osaka" },
      ],
      error: null,
    });

    render(<PrefectureList onSelectPrefecture={mockOnSelectPrefecture} />);

    // 都道府県名がリストに表示されていることを確認
    expect(screen.getByText("1. Tokyo")).toBeInTheDocument();
    expect(screen.getByText("2. Osaka")).toBeInTheDocument();
  });

  it("should call onSelectPrefecture when a checkbox is clicked", async () => {
    // useFetchPrefecturesのモック
    (useFetchPrefectures as jest.Mock).mockReturnValue({
      prefectures: [
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Osaka" },
      ],
      error: null,
    });

    render(<PrefectureList onSelectPrefecture={mockOnSelectPrefecture} />);

    // 東京のチェックボックスをクリック
    const tokyoCheckbox = screen.getByLabelText("1. Tokyo");
    fireEvent.click(tokyoCheckbox);

    // onSelectPrefectureが正しい引数で呼ばれることを確認
    await waitFor(() => {
      expect(mockOnSelectPrefecture).toHaveBeenCalledWith([1]);
    });

    // 大阪のチェックボックスをクリック
    const osakaCheckbox = screen.getByLabelText("2. Osaka");
    fireEvent.click(osakaCheckbox);

    // onSelectPrefectureが両方の都道府県を選択した状態で呼ばれることを確認
    await waitFor(() => {
      expect(mockOnSelectPrefecture).toHaveBeenCalledWith([1, 2]);
    });
  });

  it("should update the list of selected prefectures when a checkbox is unchecked", async () => {
    (useFetchPrefectures as jest.Mock).mockReturnValue({
      prefectures: [
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Osaka" },
      ],
      error: null,
    });

    render(<PrefectureList onSelectPrefecture={mockOnSelectPrefecture} />);

    const tokyoCheckbox = screen.getByLabelText("1. Tokyo");
    fireEvent.click(tokyoCheckbox); // チェックを入れる

    // チェックを外す
    fireEvent.click(tokyoCheckbox);

    // onSelectPrefectureが空の配列で呼ばれることを確認
    await waitFor(() => {
      expect(mockOnSelectPrefecture).toHaveBeenCalledWith([]);
    });
  });

  it("should display an error message if fetching prefectures fails", async () => {
    // エラーを発生させる
    (useFetchPrefectures as jest.Mock).mockReturnValue({
      prefectures: [],
      error: "Failed to fetch prefectures",
    });

    render(<PrefectureList onSelectPrefecture={mockOnSelectPrefecture} />);

    // エラーメッセージが表示されることを確認
    expect(
      screen.getByText("Error: Failed to fetch prefectures")
    ).toBeInTheDocument();
  });
});
