import { Layout } from "@/components/layout";
import { InputType, Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/utils";
import { AuthDataType } from "@/provider/auth-provider";
import { ErrorResponseAPI } from "@/types/response-api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type LoginInputType = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (input: LoginInputType) => {
      const { data } = await axiosInstance.post("/user/login", input, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data: AuthDataType) => {
      flushSync(() => {
        setAuthData({
          user: data.user as AuthDataType["user"],
        });
      });
      navigate("/", { replace: true });
    },
    onError: (error: AxiosError<ErrorResponseAPI>) => {
      alert(error);
    },
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInputType) => {
    mutate(data);
  };

  return (
    <Layout
      pageScroll
      className="grid h-[calc(100svh-var(--header-height-sm)-var(--footer-height))] min-h-[540px] place-items-center sm:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"
    >
      <div className="mx-auto w-full max-w-[350px] py-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-8 rounded-lg border-2 border-blue-400 bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300 pb-10 pt-10"
        >
          <h1 className="pb-4 text-center text-3xl font-semibold">Login</h1>
          {input.map((item) => (
            <div key={item.inputFor} className="flex flex-col gap-1">
              <Input
                {...register(item.inputFor as keyof LoginInputType)}
                {...item}
              />
            </div>
          ))}
          <button
            className="w-64 rounded-lg bg-blue-400 py-2 text-lg font-semibold text-white disabled:opacity-75"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <div className="mr-3 size-7 animate-spin rounded-full border-b-2 border-t-2 border-white" />
              </span>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-8">
            don't have account?{" "}
            <span className="text-sky-800 underline">
              <Link to="/register">Register here</Link>
            </span>
          </p>
        </form>
      </div>
    </Layout>
  );
}

const input: InputType[] = [
  {
    inputFor: "email",
    type: "email",
    placeholder: "jhondoe@gmail.com",
    required: true,
  },
  {
    inputFor: "password",
    type: "password",
    placeholder: "password",
    required: true,
  },
];

export default LoginPage;
