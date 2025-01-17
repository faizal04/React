import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });
  return { settings, isLoading, error };
}
