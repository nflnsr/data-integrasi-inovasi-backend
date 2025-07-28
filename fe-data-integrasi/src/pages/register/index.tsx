import { Layout } from "@/components/layout";
import { Link, useNavigate } from "react-router-dom";
import { InputType, Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { ErrorResponseAPI } from "@/types/response-api";

type RegisterInputType = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterInputType) =>
      await axiosInstance.post("/user/register", data),
    onSuccess: () => {
      alert("Register berhasil, silahkan login");
      navigate("/login");
    },
    onError: (error: AxiosError<ErrorResponseAPI>) => {
      alert(error?.response?.data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<RegisterInputType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterInputType) => {
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
          className="relative flex w-full flex-col items-center gap-1.5 rounded-lg border-2 border-blue-400 bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300 pb-6 pt-4"
        >
          <h1 className="text-center text-3xl font-semibold">Register</h1>
          {input.map((item) => (
            <div key={item.inputFor} className="flex flex-col gap-1">
              <Input
                {...register(item.inputFor as keyof RegisterInputType)}
                {...item}
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-1 w-64 rounded-lg bg-blue-400 py-2 text-lg font-semibold text-white disabled:opacity-55"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <div className="mr-3 size-7 animate-spin rounded-full border-b-2 border-t-2 border-white" />
              </span>
            ) : (
              "Register"
            )}
          </button>
          <p>
            have an account?{" "}
            <span className="text-sky-800 underline">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </form>
      </div>
    </Layout>
  );
}

const input: InputType[] = [
  {
    inputFor: "name",
    type: "text",
    placeholder: "Jhon Doe",
    required: true,
  },
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

export default Register;
