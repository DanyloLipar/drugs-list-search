import { QueryClient } from "@tanstack/react-query";
import { Drug } from "../types/drug";

export const queryClient = new QueryClient();

const OPENFDA_API_URL = "https://api.fda.gov/drug/label.json";

export const getDrugs = async (
  query: string,
  page: number
): Promise<{ meta: any; results: Drug[] }> => {
  const response = await fetch(
    `${OPENFDA_API_URL}?search=openfda.brand_name:${query}&limit=10&skip=${
      (page - 1) * 10
    }`
  );
  if (!response.ok) {
    throw new Error("Some problems with fetching drugs");
  }
  const data = await response.json();
  const filteredResults = data.results.filter((drug: any) => drug.openfda);

  return { ...data, results: filteredResults };
};

export const getDrugById = async (id: string): Promise<Drug> => {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?search=id:${id}`
  );
  if (!response.ok) {
    throw new Error("Some problems occured when fetching drug");
  }
  const drug = await response.json();

  return drug.results[0];
};
