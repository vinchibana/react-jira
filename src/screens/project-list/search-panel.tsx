import React from "react";
import { Project } from "../../types/project";
import { User } from "../../types/user";
import { Form, Input, Select } from "antd";
const { Option } = Select;

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
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
        <Select
          defaultValue={"负责人"}
          onChange={(value: string) => {
            setParam({
              ...param,
            });
          }}
        >
          <Option value={param.name}>{param.name}</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
