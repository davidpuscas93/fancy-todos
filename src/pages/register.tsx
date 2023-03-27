import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { FormData } from '@/types/form-data.type';

import Form from '@/components/common/form/form.component';

import styles from '@/styles/Register.module.css';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (formData: FormData) => {
    if (
      'confirmPassword' in formData &&
      formData.password !== formData.confirmPassword
    ) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (userCredential.user) {
        router.push('/login');
      }
    } catch (error: any) {
      setError(error.message);
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
        <title>Register</title>
      </Head>
      <main className={styles.root}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        <Form
          type='register'
          onSubmit={(formData: FormData) => handleFormSubmit(formData)}
          loading={loading}
        />
        <p>
          Already have an account?{' '}
          <Link className={styles.login} href='/login'>
            Login
          </Link>
        </p>
      </main>
    </>
  );
}
