import { useEffect, useState, useCallback } from 'react';

import { Orientation } from 'unsplash-js';

import Head from 'next/head';
import Router from 'next/router';

import { auth } from '@/lib/firebase';
import { getRandomPhoto } from '@/lib/unsplash';

import { ToDo } from '@/interfaces/todo.interface';

import { getTodoList } from '@/store/reducers/todos.reducer';

import { useAppDispatch, useAppSelector } from '@/store';

import Navbar from '@/components/common/navbar/navbar.component';
import Hero from '@/components/common/hero/hero.component';
import Button from '@/components/common/button/button.component';
import SidePanel from '@/components/common/side-panel/side-panel.component';

import ToDoGallery from '@/components/modules/home/todo-gallery/todo-gallery.component';

import styles from '@/styles/Home.module.css';

export default function Home() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  const todos: Array<ToDo> = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleDisplayPanel = () => {
    setIsPanelVisible(true);
  };

  const fetchRandomPhoto = useCallback(async (orientation: Orientation) => {
    try {
      const photo = await getRandomPhoto(orientation);
      if (photo && photo.length && photo[0].urls && photo[0].urls.full) {
        setHeroImage(photo[0].urls.full);
        setOrientation(orientation);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let orientation: Orientation = 'landscape';
      if (window.innerWidth < window.innerHeight) {
        orientation = 'portrait';
      } else {
        orientation = 'landscape';
      }
      fetchRandomPhoto(orientation);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchRandomPhoto]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push('/login');
      } else {
        dispatch(getTodoList(user.uid));
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [dispatch, orientation]);

  return (
    <>
      <Head>
        <title>Fancy ToDOs</title>
        <meta
          name='description'
          content='A small demo app for displaying and manipulating todos'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.root}>
        <Navbar />
        <Hero
          imageUrl={heroImage}
          altText='hero-image'
          orientation={orientation}
        />
        <div className={styles.buttonWrapper}>
          <div className={styles.button}>
            <Button onClick={handleDisplayPanel}>
              <span>Add ToDO</span>
            </Button>
          </div>
        </div>
        <ToDoGallery data={todos} />
        <SidePanel
          isPanelVisible={isPanelVisible}
          onClose={() => setIsPanelVisible(false)}
          type='create'
        />
      </main>
    </>
  );
}
