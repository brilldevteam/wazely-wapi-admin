import {
  CreatePlanSnippetRequest,
  GetPlanSnippetsResponse,
  PlanSnippetData,
} from "@/src/types/plan";
import { baseApi } from "./baseApi";

export const planSnippetApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["PlanSnippet"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllPlanSnippets: builder.query<
        GetPlanSnippetsResponse,
        { page?: number; limit?: number }
      >({
        query: (params) => {
          const queryParams = new URLSearchParams();
          if (params?.page) queryParams.append("page", params.page.toString());
          if (params?.limit)
            queryParams.append("limit", params.limit.toString());
          return `/plan-snippets?${queryParams.toString()}`;
        },
        providesTags: (result) =>
          result?.data?.snippets
            ? [
                ...result.data.snippets.map(({ _id }) => ({
                  type: "PlanSnippet" as const,
                  id: _id,
                })),
                { type: "PlanSnippet", id: "LIST" },
              ]
            : [{ type: "PlanSnippet", id: "LIST" }],
      }),

      createPlanSnippet: builder.mutation<
        { success: boolean; data: PlanSnippetData },
        CreatePlanSnippetRequest
      >({
        query: (body) => ({
          url: "/plan-snippets",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "PlanSnippet", id: "LIST" }],
      }),

      deletePlanSnippet: builder.mutation<
        { success: boolean; message: string },
        string
      >({
        query: (id) => ({
          url: `/plan-snippets/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "PlanSnippet", id: "LIST" }],
      }),
    }),
  });

export const {
  useGetAllPlanSnippetsQuery,
  useCreatePlanSnippetMutation,
  useDeletePlanSnippetMutation,
} = planSnippetApi;
