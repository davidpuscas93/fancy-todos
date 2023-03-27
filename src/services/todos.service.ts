import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { ToDo } from '@/interfaces/todo.interface';

export const getTodos = async (userId: string) => {
  if (userId) {
    try {
      const todosSnapshot = await getDocs(
        collection(db, `users/${userId}/todos`)
      );
      const todos: ToDo[] = [];
      todosSnapshot.forEach((doc) => {
        const todo = doc.data() as ToDo;
        const docId = doc.id;
        todo.docId = docId;
        todos.push(todo);
      });
      return todos;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return [];
};

export const createTodo = async (todo: ToDo, userId: string) => {
  if (userId) {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/todos`), {
        ...todo,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateTodo = async (todo: ToDo, docId: string, userId: string) => {
  if (userId) {
    try {
      const docRef = doc(db, `users/${userId}/todos`, docId);
      await updateDoc(docRef, {
        ...todo,
      });
      console.log('Document updated');
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteTodo = async (docId: string, userId: string) => {
  if (userId) {
    try {
      const docRef = doc(db, `users/${userId}/todos`, docId);
      await deleteDoc(docRef);
      console.log('Document deleted.');
    } catch (error) {
      console.log(error);
    }
  }
};
