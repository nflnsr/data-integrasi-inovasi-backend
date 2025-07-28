import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function Header() {
  const { authData, setAuthData } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { mutate, isPending: isPendingLogout } = useMutation({
    mutationFn: async () => {
      await axiosPrivate.post("/user/logout");
    },
    onSuccess: () => {
      setAuthData({
        user: {
          id: "",
          name: "",
          email: "",
          roles: [],
        },
      });
      navigate("/login", { replace: true });
    },
  });

  const logoutHandler = () => {
    mutate();
  };

  return (
    <header className="flex h-[var(--header-height-sm)] w-full items-center justify-between bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-500 px-10 max-[400px]:px-5 sm:h-[var(--header-height-lg)] sm:py-0 lg:px-20 xl:px-40">
      <div>
        <Link to="/">
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            Test Backend
          </h1>
        </Link>
      </div>
      {authData.user.name ? (
        <div className="flex flex-col items-center gap-4 text-center font-semibold text-white sm:flex-row sm:gap-5">
          <h1>{authData.user.name}</h1>
          <details className="group relative flex items-center justify-center rounded-lg">
            <summary className="w-fit bg-sky-400 px-4 py-1 marker:content-['ketutup'] group-open:marker:content-['kebuka']"></summary>
            <button
              onClick={() => logoutHandler()}
              className="absolute left-1/2 top-[calc(100%+5px)] -translate-x-1/2 rounded-lg bg-red-500 px-8 pb-3.5 pt-3"
            >
              {isPendingLogout ? (
                <span className="block size-4 animate-spin rounded-full border-b-2 border-t-2" />
              ) : (
                "Logout"
              )}
            </button>
          </details>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-center font-semibold text-white sm:flex-row sm:gap-5">
          <Link to="/login" className="rounded-lg bg-sky-400 px-8 py-2">
            <button>Login</button>
          </Link>
          <Link to="/register" className="rounded-lg bg-blue-500 px-8 py-2">
            <button>Register</button>
          </Link>
        </div>
      )}
    </header>
  );
}
