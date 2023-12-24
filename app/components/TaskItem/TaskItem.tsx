"use client"
import React, { useState } from 'react'
import { edit, trash } from '@/app/utils/Icons';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import formatDate from '@/app/utils/formatDate';
import Modal from '../Modals/Modal';
import UpdateContent from '../Modals/UpdateContent';

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
}

const TaskItem: React.FC<Props> = ({title, description, date, isCompleted, id, isImportant}) => {
    const {theme, deleteTask, updateTask, openModal, modal} = useGlobalState();

    const [updateModal, setUpdateModal] = useState(false);

    const showUpdateModal = () => setUpdateModal(true);

  return (
    <TaskItemStyled theme={theme}>
      {updateModal && <Modal content={<UpdateContent 
      currTitle={title}
      currDescription={description}
      currDate={date}
      isCompleted={isCompleted}
      isImportant={isImportant}
      id={id}
      />}  />}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className='date'>{formatDate(date)}</p>

      <div className="task-footer">
        {isCompleted ? (
        <button className="completed" onClick={() => {
          const task={
            id,
            isCompleted: !isCompleted
          }
          updateTask(task)
        }}>
          Completed
        </button>) : 
        (
          <button className="incomplete" onClick={() => {
            const task={
              id,
              isCompleted: !isCompleted
            }
            updateTask(task)
          }}>
            Incomplete
          </button>
        )}
        <button className="edit" onClick={showUpdateModal}>
          {edit}
        </button>
        <button className="delete" onClick={() => deleteTask(id)}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  )
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
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
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }



`;

export default TaskItem