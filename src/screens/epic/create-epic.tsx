import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { DrawerProps } from "antd/es";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/epic";
import { useForm } from "antd/es/form/Form";
import { useProjectIdInUrl } from "../kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic();
  const [form] = useForm();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };
  const projectId = useProjectIdInUrl();

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Container>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={isLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Container>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
