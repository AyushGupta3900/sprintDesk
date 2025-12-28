import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

/* -------------------------------------------------
   RAW BASE QUERY
-------------------------------------------------- */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/* -------------------------------------------------
   BASE QUERY WITH GLOBAL ERROR HANDLING
-------------------------------------------------- */
const baseQueryWithToast = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    // Backend standard error message
    const message =
      result.error?.data?.message ||
      "Something went wrong. Please try again.";

    // 🔑 AUTH ERROR (OPTIONAL: future-proof)
    if (status === 401) {
      toast.error("Session expired. Please login again.");
    } else {
      toast.error(message);
    }
  }

  return result;
};

/* -------------------------------------------------
   API INSTANCE
-------------------------------------------------- */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithToast,
  tagTypes: ["User", "Workspace", "Project", "Task"],
  endpoints: () => ({}),
});
