import styles from './hero.module.css';
import { useParallax } from 'react-scroll-parallax';

type HeroProps = {
  imageUrl: string;
  altText: string;
};

const Hero = ({ imageUrl, altText }: HeroProps) => {
  const { ref } = useParallax<HTMLDivElement>({ speed: -50 });

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles.hero} onClick={handleScrollDown}>
        <div ref={ref}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={altText} className={styles.image} />
        </div>
      </div>
      <div className={styles.bottom} onClick={handleScrollDown}>
        &#8595;
      </div>
    </>
  );
};

export default Hero;
