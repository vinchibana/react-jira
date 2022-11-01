import React from "react";
import { List } from "./list";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectSearchParam } from "./util";
import { SearchPanel } from "./search-panel";
import { Button } from "antd";
import { Row } from "components/lib";

export const ProjectListScreen = () => {
  // 初始化用户列表、任务列表、搜索参数状态
  const [param, setParam] = useProjectSearchParam();
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  const {
    error,
    isLoading,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));

  return (
    <Container>
      <Row between={true} marginBottom={2}>
        <h1>项目列表</h1>
        <Button onClick={() => open()}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {/* List = ({ users, ...props }: ListProps */}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
