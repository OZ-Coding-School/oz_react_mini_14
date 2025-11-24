import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  progressStyle: { background: "#ff1a66" },
  style: {
    background: "background: rgba(255, 255, 255, 0.05);",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "12px",
    color: "#ff1a66",
  },
};

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message, options = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  warning: (message, options = {}) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },
  info: (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
};
