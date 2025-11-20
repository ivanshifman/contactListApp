import { useNavigate } from "react-router";
import { registerMethod, type IRegisterBody } from "../../services/auth-service";
import { handleApiError } from "../../api/errorHandler";
import { showError, showSuccess } from "../../utils/toast.utils";

export const useRegister = () => {
  const navigate = useNavigate();
  const registerUser = async (body: IRegisterBody) => {
    try {
      await registerMethod(body);
      showSuccess("Registro exitoso.");
      navigate("/login");
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  return { registerUser };
};