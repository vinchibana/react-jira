import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "../types/task";
import { SortProps } from "./kanban";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        method: "POST",
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries("tasks") }
  );
};

export const useTask = (id: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries("tasks") }
  );
};

export const useDeleteTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries("tasks") }
  );
};

export const useReorderTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: SortProps) =>
      client("tasks/reorder", {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("tasks") }
  );
};
