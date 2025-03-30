"use client";
/*

import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import CreateContent from "../Models/CreateContent";
import Model from "../Models/Model";
import { title } from "process";
import CreateTaskModal from "../Modals/CreateTask";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, openModel, model } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      {model && <Model content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isComplete={task.isComplete}
            id={task.id}
          />
        ))}
        <button className="create-task" onClick={openModel}>
          {plus}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorTextSecondary};
  border: 2px solid ${(props) => props.theme.colorbackground};
  border-radius: 1rem;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey4};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
  }
`;

export default Tasks;
*/

import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import CreateTaskModal from "../Modals/CreateTask";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  return (
    <TaskStyled>
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isComplete={task.isComplete}
            id={task.id}
          />
        ))}
        {/* Botão que abre o modal */}
        <CreateTaskModal />
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorTextSecondary};
  border: 2px solid ${(props) => props.theme.colorbackground};
  border-radius: 1rem;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
  }
`;

export default Tasks;
