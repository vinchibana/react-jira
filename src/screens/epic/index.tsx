import { ScreenContainer } from "components/lib";
import React from "react";
import { useProjectInUrl } from "../kanban/util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <h1>任务组</h1>
    </ScreenContainer>
  );
};
