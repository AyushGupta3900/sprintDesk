import { baseApi } from "../../api/baseApi";
import { setAuthenticated, setAuthInitialized, logout} from "./auth.slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // REGISTER
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // LOGIN
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("token", data.token);
        dispatch(setAuthenticated(true));
      },
    }),

    // GET LOGGED IN USER
    getAuthUser: builder.query({
      query: () => "/api/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setAuthenticated(true));
        } catch {
          dispatch(setAuthenticated(false));
        } finally {
          dispatch(setAuthInitialized());
        }
      },
      providesTags: ["User"],
    }),

    // LOGOUT
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        localStorage.removeItem("token");
        dispatch(logout());
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
