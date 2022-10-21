import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface ListProps extends TableProps<Project> {
  list: Project[];
  users: User[];
}
export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      dataSource={list}
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "lal",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
      ]}
    ></Table>
  );
};
