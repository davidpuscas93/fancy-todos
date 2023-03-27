import { useEffect, useState } from 'react';

import styles from './hero.module.css';
import { useParallax } from 'react-scroll-parallax';
import { Orientation } from 'unsplash-js';

type HeroProps = {
  imageUrl: string;
  altText: string;
  orientation?: Orientation;
};

const Hero = ({ imageUrl, altText, orientation }: HeroProps) => {
  const { ref } = useParallax<HTMLDivElement>({ speed: -50 });
  const [backupImage, setBackupImage] = useState(
    '/assets/agenda-landscape.jpg'
  );

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (orientation === 'portrait') {
      setBackupImage('/assets/agenda-portrait.jpg');
    } else {
      setBackupImage('/assets/agenda-landscape.jpg');
    }
  }, [orientation]);

  return (
    <>
      <div className={styles.hero} onClick={handleScrollDown}>
        <div ref={ref}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl ? imageUrl : backupImage}
            alt={altText}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.bottom} onClick={handleScrollDown}>
        &#8595;
      </div>
    </>
  );
};

export default Hero;
