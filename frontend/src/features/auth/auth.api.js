import { baseApi } from "../../api/baseApi";
import {
  setUser,
  setAuthenticated,
  setAuthInitialized,
  logout,
} from "./auth.slice";
import { clearWorkspace } from "../workspaces/workspace.slice";
import {
  connectSocket,
  disconnectSocket,
} from "../../sockets/socket";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem("token", data.token);

          dispatch(setAuthenticated(true));

          connectSocket(data.token);
        } catch {
        }
      },
    }),

    getAuthUser: builder.query({
      query: () => "/api/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));

          const token = localStorage.getItem("token");
          if (token) {
            connectSocket(token);
          }
        } catch {
          disconnectSocket();

          dispatch(logout());
          dispatch(clearWorkspace());
        } finally {
          dispatch(setAuthInitialized());
        }
      },
      providesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        disconnectSocket();

        localStorage.removeItem("token");

        dispatch(logout());
        dispatch(clearWorkspace());

        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAuthUserQuery,
  useLogoutUserMutation,
} = authApi;
