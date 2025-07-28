import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { axiosPrivateInstance } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function useAxiosPrivate() {
  const { authData, setAuthData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        // if (!config.headers["Authorization"]) {
        //   config.headers["Authorization"] = `Bearer ${authData.accessToken}`;
        // }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          setAuthData({
            // accessToken: "",
            user: {
              id: "",
              name: "",
              email: "",
            },
          });
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [authData, navigate, setAuthData]);

  return axiosPrivateInstance;
}
