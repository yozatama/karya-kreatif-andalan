import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUsers, currentUser } from "@/lib/dashboard-mock-data";

export function useUsers(filters?: { role?: string; verificationStatus?: string; search?: string }) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      let result = [...adminUsers];
      if (filters?.verificationStatus && filters.verificationStatus !== "all") {
        result = result.filter((u) => u.verificationStatus === filters.verificationStatus);
      }
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        result = result.filter(
          (u) =>
            u.firstName.toLowerCase().includes(s) ||
            u.lastName.toLowerCase().includes(s) ||
            u.email.toLowerCase().includes(s)
        );
      }
      return result;
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return adminUsers.find((u) => u.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return currentUser;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, string>) => {
      await new Promise((r) => setTimeout(r, 500));
      return { ...currentUser, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}
