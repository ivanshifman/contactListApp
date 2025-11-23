import { useTransition } from "react";
import { useAppContext } from "../../context/useAppContext";
import { useLogout } from "../../hooks/auth/useLogout";

export default function CardUser() {
  const { user } = useAppContext();
  const { logoutUser } = useLogout();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutUser();
    });
  };

  if (!user) return null;

  return (
    <div className="flex flex-row items-center justify-end gap-2 w-[300px]">
      <div className="w-8 h-8 rounded-full bg-neutral-800 flex justify-center items-center text-white">
        <span>{user.name[0]}</span>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <p className="text-neutral-700 text-sm font-semibold">
          {user.name} ({user.username})
        </p>

        <button
          disabled={isPending}
          onClick={handleLogout}
          className="text-xs text-red-400 cursor-pointer transition-all hover:text-red-500 font-semibold disabled:opacity-50"
        >
          {isPending ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
