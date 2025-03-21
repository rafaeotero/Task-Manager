"use client";

import React from "react";
import { edit, trash } from "@/app/utils/Icons";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import formatDate from "@/app/utils/fomatDate";

interface Props {
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
  id: string;
}

function TaskItem({ title, description, date, isComplete, id }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();
  const formatedDate = formatDate(date);

  return (
    <TaskItemStyled theme={theme}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="date">{formatedDate}</p>
        <div className="task-footer">
          {isComplete ? (
            <button
              className="completed"
              onClick={() => {
                const task = {
                  id,
                  isComplete: !isComplete,
                };

                updateTask(task);
              }}
            >
              Completed
            </button>
          ) : (
            <button
              className="incomplete"
              onClick={() => {
                const task = {
                  id,
                  isComplete: !isComplete,
                };

                updateTask(task);
              }}
            >
              Incomplete
            </button>
          )}
          <button className="edit">{edit}</button>
          <button
            className="delete"
            onClick={() => {
              deleteTask(id);
            }}
          >
            {trash}
          </button>
        </div>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colorGrey4};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.colorGrey5};

  .date {
    margin-top: 110px;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2 rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: white;
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default TaskItem;
