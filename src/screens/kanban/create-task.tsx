import React, { useEffect, useState } from "react";
import { useProjectIdInUrl } from "./util";
import { Card, Input } from "antd";
import { useAddTask } from "../../utils/task";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);
  const toggle = () => setInputMode((mode) => !mode);
  const { mutateAsync: addTask } = useAddTask();

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+ 创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么？"}
        autoFocus={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
      />
    </Card>
  );
};
