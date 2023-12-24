"use client"
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components'
import CreateContent from '../Modals/CreateContent'
import TaskItem from '../TaskItem/TaskItem'
import { plus } from '@/app/utils/Icons'

interface Props {
    title: string;
    tasks: any[];
}

const Tasks: React.FC<Props> = ({title, tasks}) => {

    const {theme} = useGlobalState();

  return (
    <TasksStyled theme={theme}>
        {/* <CreateContent /> */}
        <h1>{title}</h1>
        <div className="tasks grid">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    date={task.date}
                    isCompleted={task.isCompleted}
                    id={task.id}
                />
            ))}
            <button className="create-task">
                {plus}
                Add Task
            </button>
        </div>
    </TasksStyled>
  )
}

const TasksStyled = styled.main`
    position: relative;
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

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
        color: ${(props) => props.theme.colorGrey2};
        font-weight: 600;
        cursor: pointer;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.3s ease;

        i {
            font-size: 1.5rem;
            margin-right: 0.2rem;
        }

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey0};
        }
    }

    .tasks {
        margin: 2rem 0;
    }
`;

export default Tasks