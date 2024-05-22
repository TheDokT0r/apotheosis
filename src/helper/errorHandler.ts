import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function errorHandler(error: unknown) {
  if (typeof error === "string") {
    toast.error(error.toUpperCase());
  } else if (error instanceof AxiosError) {
    toast.error(error.response?.data);
  } else if (error instanceof Error) {
    toast.error(error.message);
  }
}