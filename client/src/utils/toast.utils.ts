import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "15px",
  fontWeight: 500,
};

export const showSuccess = (message: string) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      background: "#12B886",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "#12B886",
    },
  });

export const showError = (message: string) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      background: "#FA5252",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "#FA5252",
    },
  });
