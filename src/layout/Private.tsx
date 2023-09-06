import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../api/auth.api";
import Loading from "../pages/Loading";
interface PrivateProps {
  role: ("admin" | "user" | "guest")[];
}
function Private({ role }: PrivateProps) {
  const { data, isLoading, isSuccess, isError, error } = useGetMeQuery({});
  if (isError) {
    console.log({ error });
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isSuccess && role.includes(data.data.role) ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}

export default Private;
