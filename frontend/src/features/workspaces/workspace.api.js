import { baseApi } from "../../api/baseApi";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query({
      query: () => "/api/workspaces",
      providesTags: ["Workspace"],
    }),

    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "/api/workspaces",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),

    updateWorkspace: builder.mutation({
      query: ({ workspaceId, data }) => ({
        url: `/api/workspaces/${workspaceId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),

    deleteWorkspace: builder.mutation({
      query: (workspaceId) => ({
        url: `/api/workspaces/${workspaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace"],
    }),

    getWorkspaceMembers: builder.query({
      query: (workspaceId) =>
        `/api/workspaces/${workspaceId}/members`,
      providesTags: (result, error, id) => [
        { type: "Workspace", id },
      ],
    }),

    inviteMember: builder.mutation({
      query: ({ workspaceId, email, role }) => ({
        url: `/api/workspaces/${workspaceId}/invite`,
        method: "POST",
        body: { email, role },
      }),
      invalidatesTags: ["Workspace"],
    }),

    updateMemberRole: builder.mutation({
      query: ({ workspaceId, memberId, role }) => ({
        url: `/api/workspaces/${workspaceId}/members/${memberId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Workspace"],
    }),

    removeMember: builder.mutation({
      query: ({ workspaceId, memberId }) => ({
        url: `/api/workspaces/${workspaceId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace"],
    }),

    getWorkspaceAnalytics: builder.query({
      query: (workspaceId) =>
        `/api/workspaces/${workspaceId}/analytics`,
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useInviteMemberMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useGetWorkspaceAnalyticsQuery,
} = workspaceApi;
