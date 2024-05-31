import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function errorHandler(error: unknown) {
  console.log(error);

  if (typeof error === "string") {
    toast.error(error.toUpperCase());
  } else if (error instanceof AxiosError) {
    toast.error(error.response?.data);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else if (error instanceof Object && "data" in error) {
    toast.error(String(error.data));
  }
}
