import { type ReactNode, useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { apiClient } from "../../api/axios-client";
import { Navigate } from "react-router";
import { handleApiError } from "../../api/errorHandler";
import { showError } from "../../utils/toast.utils";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = userStore.getState();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await apiClient.get("/auth/profile");
        setUser(data.user);
      } catch (err) {
        setUser(null);
        const e = handleApiError(err);
        showError(e.message);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [setUser]);

  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}
