import { ScreenContainer } from "components/lib";
import React, { useState } from "react";
import { useProjectInUrl } from "../kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import { Row } from "components/lib";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { Epic } from "../../types/epic";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic();
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  return (
    <ScreenContainer>
      <Row>
        <h1>任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>
                    开始时间：{dayjs(epic.start).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div>
                    结束时间：{dayjs(epic.end).format("YYYY-MM-DD HH:mm")}
                  </div>
                </div>
              }
            />

            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => {
          setEpicCreateOpen(false);
        }}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
