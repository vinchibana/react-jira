import React from "react";
import { Dropdown, Table, TableProps, Menu } from "antd";
import { Project } from "../../types/project";
import { User } from "../../types/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./util";

// TableProps + users
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  return (
    <Table
      {...props}
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD HH:mm")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        onClick={editProject(project.id)}
                        type={"link"}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                    <Menu.Item key={"delete"}>删除</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
    ></Table>
  );
};
