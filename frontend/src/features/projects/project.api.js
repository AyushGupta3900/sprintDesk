import { baseApi } from "../../api/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (workspaceId) => `/api/projects/workspace/${workspaceId}/all`,
      providesTags: ["Project"],
    }),

    createProject: builder.mutation({
      query: ({ workspaceId, name, description, emoji }) => ({
        url: `/api/projects/workspace/${workspaceId}/create`,
        method: "POST",
        body: { name, description, emoji },
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: ({ projectId, workspaceId }) => ({
        url: `/api/projects/${projectId}/workspace/${workspaceId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, workspaceId, data }) => ({
        url: `/api/projects/${projectId}/workspace/${workspaceId}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectApi;
