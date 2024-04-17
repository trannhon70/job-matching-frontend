"use client";

import { axiosAuth } from "@/services/apis";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosAuth = () => {
  const session = useSession();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      async function (config) {
        try {
          const accessToken = session?.data?.user.data.token;
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          return config;
        } catch (error) {
          throw error;
        }
      },
    );
    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);
  return axiosAuth;
};

export default useAxiosAuth;
