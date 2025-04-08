"use client";

import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import CreateTaskModal from "../Modals/CreateTask";
import { useTaskStore } from "../../store/taskStore";
import { useEffect } from "react";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  console.log(`Rendering ${title}:`, tasks);

  return (
    <TaskStyled>
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description ?? ""}
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
