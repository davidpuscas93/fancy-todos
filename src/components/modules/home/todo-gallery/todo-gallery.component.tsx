import { useState, useCallback, useEffect } from 'react';
import cls from 'classnames';

import { ToDo } from '@/interfaces/todo.interface';

import ToDoCard from '@/components/modules/home/todo-card/todo-card.component';
import SidePanel from '@/components/common/side-panel/side-panel.component';

import styles from './todo-gallery.module.css';
import Button from '@/components/common/button/button.component';

type ToDoGalleryProps = {
  data: Array<ToDo>;
};

const ToDoGallery = (props: ToDoGalleryProps) => {
  const { data } = props;

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ToDo | null>(null);
  const [todos, setTodos] = useState<Array<ToDo>>([]);

  const sortAlphabeticallyAscending = useCallback(() => {
    setTodos((prevTodos) => {
      const sortedTodos = [...prevTodos].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      return sortedTodos;
    });
  }, []);

  const sortAlphabeticallyDescending = useCallback(() => {
    setTodos((prevTodos) => {
      const sortedTodos = [...prevTodos].sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
      return sortedTodos;
    });
  }, []);

  const handlePanelOpen = useCallback((todo: ToDo) => {
    setIsPanelVisible(true);
    setSelectedItem(todo);
  }, []);

  const handlePanelClose = useCallback(() => {
    setIsPanelVisible(false);
    setSelectedItem(null);
  }, []);

  const generateDefaultGallery = useCallback(() => {
    return todos.map((todo, index) => {
      return <ToDoCard key={index} todo={todo} onPanelOpen={handlePanelOpen} />;
    });
  }, [todos, handlePanelOpen]);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  return (
    <>
      {todos.length ? (
        <>
          <div className={styles.buttonWrapper}>
            <Button onClick={sortAlphabeticallyAscending}>
              Sort ascending
            </Button>
            <Button onClick={sortAlphabeticallyDescending}>
              Sort descending
            </Button>
          </div>
          <div className={cls(styles.gallery, styles.default)}>
            {generateDefaultGallery()}
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <h3 className={styles.emptyTitle}>
            Here you will see your ToDO items that you can add with the button
            above.
          </h3>
        </div>
      )}
      <SidePanel
        isPanelVisible={isPanelVisible}
        onClose={handlePanelClose}
        item={selectedItem}
        type='update'
      />
    </>
  );
};

export default ToDoGallery;
