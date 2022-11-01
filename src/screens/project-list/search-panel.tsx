import React from "react";
import { Project } from "../../types/project";
import { User } from "../../types/user";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({ ...param, name: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName={"负责人"}
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}
        />
      </Form.Item>
    </Form>
  );
};
