import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { FormData } from '@/types/form-data.type';

import Form from '@/components/common/form/form.component';

import styles from '@/styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (userCredential.user) {
        router.push('/');
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.root}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <Form
          type='login'
          onSubmit={(formData: FormData) => handleFormSubmit(formData)}
          loading={loading}
        />
        <p>
          No account?{' '}
          <Link className={styles.register} href='/register'>
            Register
          </Link>
        </p>
      </main>
    </>
  );
}
