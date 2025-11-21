import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import { apiClient } from "../../api/axios-client";
import { useAppContext } from "../../context/useAppContext";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user, setUser } = useAppContext();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verify() {
      if (user) {
        setChecking(false);
        return;
      }

      try {
        const { data } = await apiClient.get("/auth/profile");
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    }

    verify();
  }, [user, setUser]);

  if (checking) return null;
  return user ? <Navigate to="/" replace /> : children;
}
