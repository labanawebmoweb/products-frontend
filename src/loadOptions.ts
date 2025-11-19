import axios from "axios";
import type { GroupBase, OptionsOrGroups } from "react-select";

export type OptionType = {
  value: number;
  label: string;
};
const API_URL = import.meta.env.VITE_API_URL;

export const loadOptions = async (
  search: string,
  loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  additional: { page: number }
) => {
  const page = additional?.page || 1;
  const limit = 10;

  const params = {
    search,
    page,
    limit,
  };

  // Axios request
  const res = await axios.get(`${API_URL}/product`, { params });
  const json = res.data;

  const products = json.data;
  console.log(products);
  const total = json.meta?.total ?? products.length;
  const currentPage = Number(json.meta?.page ?? page);
  const backendLimit = Number(json.meta?.limit ?? limit);

  // convert to react-select options
  const newOptions: OptionType[] = products.map((p: any) => ({
    value: p.id,
    label: p.name,
  }));
  console.log("newOptions", newOptions);

  // const loadedCount = loadedOptions.length + newOptions.length;

  return {
    options: newOptions,
    // hasMore: loadedCount < total,
    hasMore: currentPage * backendLimit < total,

    additional: {
      page: currentPage + 1,
    },
  };
};
