import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@/lib/dashboard-mock-data";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return notifications;
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((r) => setTimeout(r, 200));
      return { id, read: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
