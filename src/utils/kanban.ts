import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddKanban = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", {
        method: "POST",
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries("kanbans") }
  );
};

export const useDeleteKanban = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries("kanbans") }
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: SortProps) =>
      client("kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("kanbans") }
  );
};
