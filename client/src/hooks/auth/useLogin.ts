import { useNavigate } from "react-router";
import { loginMethod } from "../../services/auth-service";
import { handleApiError } from "../../api/errorHandler";
import { useAppContext } from "../../context/useAppContext";
import { showError, showSuccess } from "../../utils/toast.utils";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const loginUser = async (username: string, password: string) => {
    try {
      const { data } = await loginMethod(username, password);
      setUser(data.user);
      showSuccess("Successful login.");
      navigate("/", { replace: true });
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  return { loginUser };
};
