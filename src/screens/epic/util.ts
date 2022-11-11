import { useProjectIdInUrl } from "../kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
