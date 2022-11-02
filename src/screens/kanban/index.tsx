import React from "react";
import { useKanbans } from "../../utils/useKanbans";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export const KanbanScreen = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();

  return (
    <ColumnsContainer>
      <h1>{currentProject?.name} 看板</h1>
      <SearchPanel />
      {kanbans?.map((kanban) => (
        <KanbanColumn kanban={kanban} key={kanban.id} />
      ))}
    </ColumnsContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
