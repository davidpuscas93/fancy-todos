import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import styles from './navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const router = useRouter();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        setAvatarUrl(data.results[0].picture.large);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAvatarImage();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <Link href='/'>ToDOs</Link>
      </div>
      <div className={styles.avatar} onClick={handleMenuClick}>
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt='Avatar'
            width={80}
            height={80}
            className={styles.image}
          />
        )}
        {menuOpen && (
          <div className={styles.menu}>
            <button onClick={handleLogoutClick} className={styles.logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
