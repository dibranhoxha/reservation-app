import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from "../types";

const api = import.meta.env.VITE_BASE_URL;

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => `companies`,
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
