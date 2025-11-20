import { useNavigate } from "react-router";
import { loginMethod } from "../../services/auth-service";
import { userStore } from "../../store/userStore";
import { handleApiError } from "../../api/errorHandler";
import { showError, showSuccess } from "../../utils/toast.utils";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = userStore.getState();

  const loginUser = async (username: string, password: string) => {
    try {
      const { data } = await loginMethod(username, password);
      setUser(data.user);
      showSuccess("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  return { loginUser };
};
