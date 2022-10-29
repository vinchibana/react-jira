import React from "react";
import { List } from "./list";
import { useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";

export const ProjectListScreen = () => {
  // 初始化用户列表、任务列表、搜索参数状态
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const { data: users } = useUsers();
  const {
    error,
    isLoading,
    data: list,
  } = useProjects(cleanObject(debouncedParam));

  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <h1>项目列表</h1>
      {/* List = ({ users, ...props }: ListProps */}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
