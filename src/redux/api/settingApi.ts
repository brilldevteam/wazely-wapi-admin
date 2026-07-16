/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppSettings,
  TestMailPayload,
  TestMailResponse,
} from "@/src/types/setting";
import { baseApi } from "./baseApi";

export const settingApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Settings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSettings: builder.query<AppSettings, void>({
        query: () => "/setting",
        providesTags: ["Settings"],
      }),
      updateSettings: builder.mutation<
        AppSettings,
        FormData | Partial<AppSettings>
      >({
        query: (body) => ({
          url: "/setting",
          method: "PUT",
          body,
          // Don't set Content-Type — let browser set multipart boundary for FormData
          formData: body instanceof FormData,
        }),
        invalidatesTags: ["Settings"],
      }),
      testMail: builder.mutation<TestMailResponse, TestMailPayload>({
        query: (body) => ({
          url: "/setting/mail/test",
          method: "POST",
          body,
        }),
      }),
    }),
  });

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useTestMailMutation,
} = settingApi;
