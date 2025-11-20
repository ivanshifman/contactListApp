import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import { loginSchema, type LoginSchema } from "../../schemas/authSchemas";

export default function FormLogin() {
  const [isPending, startTransition] = useTransition();
  const { loginUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginSchema) => {
    startTransition(async () => {
      await loginUser(values.username, values.password);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col gap-2 justify-center items-center border-gray-200 border rounded-md w-[400px]"
    >
      <h2 className="text-2xl font-semibold text-neutral-800 text-center">
        Sign In
      </h2>

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Username:
      </label>
      <input
        {...register("username")}
        type="text"
        placeholder="Inserte el nombre de usuario"
        className="w-[90%] p-2 border border-gray-300 text-sm outline-none focus:border-2 focus:border-sky-500 transition-all rounded-md"
      />
      {errors.username && (
        <p className="w-[90%] text-xs text-red-500">
          {errors.username.message}
        </p>
      )}

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Password:
      </label>
      <input
        {...register("password")}
        type="password"
        placeholder="Inserte la contraseña"
        className="w-[90%] p-2 border border-gray-300 text-sm outline-none focus:border-2 focus:border-sky-500 transition-all rounded-md"
      />
      {errors.password && (
        <p className="w-[90%] text-xs text-red-500">
          {errors.password.message}
        </p>
      )}

      <button
        className="w-[90%] cursor-pointer p-2 text-sm font-semibold text-white rounded-md bg-sky-500 hover:bg-sky-600 transition-all"
        disabled={isPending}
      >
        Sign In
      </button>
      <Link
        to="/register"
        className="mt-2 text-xs font-semibold text-sky-500 cursor-pointer hover:underline transition-all"
      >
        Don't have an account? Register here.
      </Link>
    </form>
  );
}
