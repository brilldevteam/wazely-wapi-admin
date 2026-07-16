import { SwitchToTenantResponse } from "@/src/types/redux";
import { baseApi } from "./baseApi";



const selfTenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    switchToTenant: builder.mutation<SwitchToTenantResponse, void>({
      query: () => ({
        url: "/self-tenant/switch-to-tenant",
        method: "POST",
      }),
    }),
  }),
});

export const { useSwitchToTenantMutation } = selfTenantApi;
