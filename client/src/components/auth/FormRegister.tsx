import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useRegister } from "../../hooks/auth/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../../schemas/authSchemas";

export default function FormRegister() {
  const [isPending, startTransition] = useTransition();
  const { registerUser } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterSchema) => {
    startTransition(async () => {
      await registerUser({
        name: values.name,
        username: values.username,
        password: values.password,
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col gap-2 justify-center items-center border-gray-200 border rounded-md w-[400px]"
    >
      <h2 className="text-2xl font-semibold text-neutral-800 text-center">
        Register new user
      </h2>

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Name:
      </label>
      <input
        {...register("name")}
        type="text"
        placeholder="Ingresa tu nombre"
        className="w-[90%] p-2 border border-gray-300 text-sm outline-none focus:border-2 focus:border-sky-500 transition-all rounded-md"
      />
      {errors.name && (
        <p className="w-[90%] text-xs text-red-500">{errors.name.message}</p>
      )}

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

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Confirm Password:
      </label>
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Inserte la contraseña nuevamente"
        className="w-[90%] p-2 border border-gray-300 text-sm outline-none focus:border-2 focus:border-sky-500 transition-all rounded-md"
      />
      {errors.confirmPassword && (
        <p className="w-[90%] text-xs text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}

      <button
        className="w-[90%] cursor-pointer p-2 text-sm font-semibold text-white rounded-md bg-sky-500 hover:bg-sky-600 transition-all"
        disabled={isPending}
      >
        Register
      </button>
      <Link
        to="/login"
        className="mt-2 text-xs font-semibold text-sky-500 cursor-pointer hover:underline transition-all"
      >
        Already have an account? Login here.
      </Link>
    </form>
  );
}
