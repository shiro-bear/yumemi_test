import { useEffect, useState } from "react";

interface PopulationData {
  prefCode: number;
  label: string;
  data: { year: number; value: number }[];
}

const useFetchPopulation = (
  selectedPrefectures: number[],
  selectedLabel: string
) => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (selectedPrefectures.length > 0) {
        try {
          const dataPromises = selectedPrefectures.map(async (prefCode) => {
            const response = await fetch(
              `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
              {
                headers: {
                  "X-API-KEY": "8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const filteredData = data.result.data.find(
              (item: PopulationData) => item.label === selectedLabel
            );
            return { ...filteredData, prefCode };
          });

          const allData = await Promise.all(dataPromises);
          setPopulationData(allData.filter((item) => item !== undefined));
        } catch (error) {
          console.error("Error fetching population data:", error);
        }
      } else {
        setPopulationData([]);
      }
    };

    fetchPopulationData();
  }, [selectedPrefectures, selectedLabel]);

  return { populationData };
};

export default useFetchPopulation;
