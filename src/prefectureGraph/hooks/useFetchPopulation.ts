import { useEffect, useState } from "react";

const useFetchPopulation = (selectedPrefecture: number | null) => {
  const [populationData, setPopulationData] = useState<any>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("総人口");

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (selectedPrefecture) {
        try {
          const response = await fetch(
            `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${selectedPrefecture}`,
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
          setPopulationData(data.result.data);
        } catch (error) {
          console.error("Error fetching population data:", error);
        }
      }
    };

    fetchPopulationData();
  }, [selectedPrefecture]);

  return { populationData, selectedLabel, setSelectedLabel };
};

export default useFetchPopulation;
