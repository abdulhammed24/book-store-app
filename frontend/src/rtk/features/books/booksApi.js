import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery.js";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookBySlug: builder.query({
      query: (slug) => `/books/${slug}`,
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookBySlugQuery } = booksApi;
