import { useNavigate } from "react-router";
import { logoutMethod } from "../../services/auth-service";
import { useAppContext } from "../../context/useAppContext";
import { handleApiError } from "../../api/errorHandler";
import { showError, showSuccess } from "../../utils/toast.utils";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAppContext();

  const logoutUser = async () => {
    try {
      await logoutMethod();
      logout();
      showSuccess("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      logout();
      const apiError = handleApiError(error);
      showError(apiError.message);
      navigate("/login", { replace: true });
    }
  };

  return { logoutUser };
};
