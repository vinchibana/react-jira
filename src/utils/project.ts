import { Project } from "../types/project";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = () =>
  //   client("projects", { data: cleanObject(param || {}) });
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [param]);
  //
  // return result;
};

export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client("projects", {
        method: "POST",
        data: params,
      }),
    // 使主动查询失效
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useDeleteProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};
