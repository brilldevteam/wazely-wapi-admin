import { GetTemplatesParams, GetTemplatesResponse } from "@/src/types/template";
import { baseApi } from "./baseApi";



export const templateApi = baseApi.enhanceEndpoints({ addTagTypes: ["Template"] }).injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<GetTemplatesResponse, GetTemplatesParams>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params.waba_id) q.append("waba_id", params.waba_id);
        if (params.category) q.append("category", params.category);
        if (params.status) q.append("status", params.status);
        if (params.search) q.append("search", params.search);
        return `/template?${q.toString()}`;
      },
      providesTags: ["Template"],
    }),
  }),
});

export const { useGetTemplatesQuery } = templateApi;
