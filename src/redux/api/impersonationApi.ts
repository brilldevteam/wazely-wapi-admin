import { StartImpersonationResponse } from "@/src/types/redux";
import { baseApi } from "./baseApi";



const impersonationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startImpersonation: builder.mutation<StartImpersonationResponse, { targetUserId: string }>({
      query: (body) => ({
        url: "/impersonation/start",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useStartImpersonationMutation } = impersonationApi;
