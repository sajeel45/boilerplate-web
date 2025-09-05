import { toast } from "react-toastify";

const customToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
    });
  },
  info(msg, options = {}) {
    return toast.info(msg, {
      ...options,
    });
  },
};

export default customToast;
