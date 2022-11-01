import React from "react";
import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={() => close()}>
      <h1>project modal</h1>
      <Button onClick={() => close()}>close</Button>
    </Drawer>
  );
};
