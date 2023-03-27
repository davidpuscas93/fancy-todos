import React from 'react';
import cls from 'classnames';

import { ToDo } from '@/interfaces/todo.interface';

import styles from './todo-card.module.css';

type ToDoCardProps = {
  todo: ToDo;
  onPanelOpen: (item: ToDo) => void;
};

const ToDoCard = ({ todo, onPanelOpen }: ToDoCardProps) => {
  const { title, description } = todo;

  const handlePanelOpen = () => {
    onPanelOpen(todo);
  };

  return (
    <div className={cls(styles.card)} onClick={handlePanelOpen}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ToDoCard;
