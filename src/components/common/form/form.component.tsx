import React, { useState } from 'react';

import styles from './form.module.css';

import { FormData } from '@/types/form-data.type';

import Button from '@/components/common/button/button.component';
import Loading from '@/components/common/loading/loading.component';

type FormProps = {
  type: 'login' | 'register';
  onSubmit: (data: FormData) => void;
  loading?: boolean;
};

const Form = ({ type, onSubmit, loading }: FormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({ email, password, firstName, lastName, confirmPassword });
    } else {
      onSubmit({ email, password });
    }
  };

  const renderButtonText = () => {
    const loadingAnimation = <Loading isWhite={true} />;
    const buttonText = type === 'login' ? 'Login' : 'Register';

    if (loading) {
      return loadingAnimation;
    }
    return buttonText;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {type === 'login' ? (
        <>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className={styles.nameWrapper}>
            <div>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      )}
      <Button type='submit' disabled={loading}>{renderButtonText()}</Button>
    </form>
  );
};

export default Form;
