import React from "react";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  // 初始化用户列表、任务列表、搜索参数状态
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();
  const debouncedParam = useDebounce(param, 500);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  // 获取 list 数据
  return (
    <div>
      <List users={users} list={list} />
    </div>
  );
};
