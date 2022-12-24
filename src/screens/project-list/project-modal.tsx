import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useProjectModal } from "./util";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/project";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";

export const ProjectModal = () => {
  // 获取模态框开关状态、close 函数、loading 状态、正在编辑的 project 对象
  const { projectModalOpen, close, isLoading, editingProject } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const title = editingProject ? "编辑项目" : "创建项目";

  // 调用 useForm 钩子后会得到一个包含各种 form 操作函数的对象，称为 Form 实例
  // 而 FormStore 是一个类，存储了 Form 表单数据，并定义了各种对数据的操作
  // useForm 时，内部就会创建一个 FormStore 的实例，并通过 useRef 缓存起来
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  // 根据不同的 editingProject 对象修改 modal 中的表单内容
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => closeModal()}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Container>
          <h1>{title}</h1>
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
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder={"请输入项目名称"} />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder={"请输入部门名称"} />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOptionName={"负责人"} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type={"primary"}
                htmlType={"submit"}
                loading={mutateLoading}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
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
