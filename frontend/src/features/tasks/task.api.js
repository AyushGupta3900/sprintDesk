import { baseApi } from "../../api/baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getTasksByWorkspace: builder.query({
      query: (workspaceId) =>
        `/api/tasks/workspace/${workspaceId}/all`,
      providesTags: ["Task"],
    }),

  
    createTask: builder.mutation({
      query: ({ workspaceId, projectId, data }) => {
        if (!projectId) {
          throw new Error("projectId is required to create a task");
        }

        return {
          url: `/api/tasks/project/${projectId}/workspace/${workspaceId}/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Task"],
    }),

 
    updateTaskStatus: builder.mutation({
      query: ({ workspaceId, taskId, status, projectId }) => {
        if (!projectId) {
          throw new Error(
            "projectId is required to update task status"
          );
        }

        return {
          url: `/api/tasks/${taskId}/project/${projectId}/workspace/${workspaceId}/update`,
          method: "PUT",
          body: { status },
        };
      },

      async onQueryStarted(
        { workspaceId, taskId, status },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          taskApi.util.updateQueryData(
            "getTasksByWorkspace",
            workspaceId,
            (draft) => {
              const task = draft.find(
                (t) => String(t._id) === String(taskId)
              );
              if (task) task.status = status;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),


    assignTask: builder.mutation({
      query: ({ workspaceId, projectId, taskId, userId }) => {
        if (!projectId) {
          throw new Error(
            "projectId is required to assign task"
          );
        }

        return {
          url: `/api/tasks/${taskId}/project/${projectId}/workspace/${workspaceId}/update`,
          method: "PUT",
          body: { assignedTo: userId },
        };
      },

      async onQueryStarted(
        { workspaceId, taskId, userId },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          taskApi.util.updateQueryData(
            "getTasksByWorkspace",
            workspaceId,
            (draft) => {
              const task = draft.find(
                (t) => String(t._id) === String(taskId)
              );
              if (task) task.assignedTo = userId;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),


    updateTask: builder.mutation({
      query: ({ workspaceId, projectId, taskId, data }) => {
        if (!projectId) {
          throw new Error(
            "projectId is required to update task"
          );
        }

        return {
          url: `/api/tasks/${taskId}/project/${projectId}/workspace/${workspaceId}/update`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: ({ workspaceId, taskId }) => ({
        url: `/api/tasks/${taskId}/workspace/${workspaceId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksByWorkspaceQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useAssignTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
