import { useSelector } from "react-redux";
import { useGetWorkspaceMembersQuery } from "./workspace.api";

export default function useMyWorkspaceRole() {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    data: members = [],
    isLoading,
  } = useGetWorkspaceMembersQuery(
    currentWorkspace?._id,
    {
      skip: !currentWorkspace || !user,
    }
  );

  if (isLoading || !user) return null;

  const me = members.find(
    (m) => m?.userId?._id === user.user._id
  );
  return me?.role?.name || "MEMBER";
}
