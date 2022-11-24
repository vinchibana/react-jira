import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

// 路径拆分为数组
// http://localhost:3000/projects/1 拆分为 ['', 'projects', '1']，取中间值
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

//
export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />} />
          <Route path={"epic"} element={<EpicScreen />} />
          {/* 默认高亮索引 */}
          <Route index element={<KanbanScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  overflow: hidden;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;
