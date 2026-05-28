import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentHistory } from "@/lib/dashboard-mock-data";

export function usePayments(filters?: { status?: string; dateRange?: { start: string; end: string } }) {
  return useQuery({
    queryKey: ["payments", filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      let result = [...paymentHistory];
      if (filters?.status && filters.status !== "all") {
        result = result.filter((p) => p.status === filters.status);
      }
      return result;
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { amount: number; method: string; rentalId: string }) => {
      await new Promise((r) => setTimeout(r, 1000));
      return { id: `PAY-${Date.now()}`, ...data, status: "PAID", date: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function usePaymentInvoice(invoiceId: string) {
  return useQuery({
    queryKey: ["payment-invoice", invoiceId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { id: invoiceId, url: `/invoices/${invoiceId}.pdf` };
    },
    enabled: !!invoiceId,
  });
}
