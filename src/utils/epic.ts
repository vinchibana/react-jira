import { Epic } from "../types/epic";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Epic>) =>
      client("epics", {
        method: "POST",
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries("epics") }
  );
};

export const useDeleteEpic = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries("epics") }
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderEpic = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: SortProps) =>
      client("epics/reorder", {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("epics") }
  );
};
