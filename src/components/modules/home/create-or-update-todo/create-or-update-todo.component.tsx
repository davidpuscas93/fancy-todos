import { useEffect, useState } from 'react';

import { ToDo } from '@/interfaces/todo.interface';

import { auth } from '@/lib/firebase';

import { useAppDispatch } from '@/store';

import {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '@/store/reducers/todos.reducer';

import Button from '@/components/common/button/button.component';

import styles from './create-or-update-todo.module.css';

type CreateOrUpdateToDoProps = {
  type: 'create' | 'update';
  onClose: () => void;
  item?: ToDo;
  docId?: string;
};

const CreateOrUpdateToDo = (props: CreateOrUpdateToDoProps) => {
  const { item, type, onClose } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = auth.currentUser?.uid;

    const todo: ToDo = {
      id: Date.now(),
      title,
      description,
      imageUrl: '',
      completed: false,
      userId,
    };

    try {
      if (type === 'create' && userId) {
        dispatch(createTodoItem({ todo: todo, userId: userId }));
        onClose();
      } else if (type === 'update') {
        if (item?.docId && userId) {
          dispatch(
            updateTodoItem({ todo: todo, docId: item?.docId, userId: userId })
          );
          onClose();
        } else {
          throw new Error('User not found.');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle('');
      setDescription('');
    }
  };

  const handleDelete = async () => {
    const userId = auth.currentUser?.uid;

    if (item?.docId) {
      try {
        if (userId) {
          dispatch(deleteTodoItem({ docId: item.docId, userId: userId }));
          onClose();
        } else {
          throw new Error('User not found.');
        }
      } catch (error) {
        console.log(error);
      }
    }

    onClose();
  };

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
    }
  }, [item]);

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.buttonWrapper}>
          <Button type='submit'>
            {type === 'update' ? 'Update' : 'Create'}
          </Button>
          {type === 'update' && (
            <Button type='button' onClick={handleDelete} isDelete={true}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateToDo;
