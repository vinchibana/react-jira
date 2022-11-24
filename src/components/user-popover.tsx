import React from "react";
import { useUsers } from "../utils/user";
import styled from "@emotion/styled";
import { Typography, List, Popover } from "antd";

export const UserPopover = () => {
  const { data: users } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );

  return (
    <Popover content={content} placement={"bottom"}>
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 20rem;
`;
