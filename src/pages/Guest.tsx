import { Outlet } from "react-router-dom";
import { useCreateGuestMutation } from "../api";
import { useEffect } from "react";
import Loading from "./Loading";

function Guest() {
  const [createGuest, { isLoading }] = useCreateGuestMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      createGuest({})
        .unwrap()
        .then((data) => {
          const token = data.data.token;
          localStorage.setItem("token", token);
        })
        .catch((error) => {
          console.log({ createGuestError: error });
        });
    }
  }, []);
  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}

export default Guest;
