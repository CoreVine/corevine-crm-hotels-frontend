import { UserContext } from "@/providers";
import { useContext } from "react";

export function useUser() {
  const user = useContext(UserContext);
  return user;
}
