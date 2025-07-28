import React, { useState, createContext, useEffect } from "react";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export type AuthDataType = {
  user: {
    id: string;
    name: string;
    email: string;
    roles?: string[];
  };
};

export const AuthContext = createContext<{
  authData: AuthDataType;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType>>;
}>({
  authData: {
    user: {
      id: "",
      name: "",
      email: "",
      roles: [],
    },
  },
  setAuthData: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/user/profile");
      return data;
    },
    retry: false,
  });

  const [authData, setAuthData] = useState<AuthDataType>({
    user: data
      ? data
      : {
          id: "",
          name: "",
          email: "",
          roles: [],
        },
  });

  useEffect(() => {
    if (data)
      setAuthData({
        user: data,
      });
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
      }}
    >
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <span className="block size-12 animate-spin rounded-full border-b-2 border-t-2 border-black" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
