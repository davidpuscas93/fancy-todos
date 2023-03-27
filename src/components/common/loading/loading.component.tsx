import cls from 'classnames';

import styles from './loading.module.css';

type LoadingProps = {
  isWhite?: boolean;
};

const Loading = (props: LoadingProps) => {
  const { isWhite } = props;

  const colorStyle = {
    backgroundColor: isWhite ? 'white' : 'black',
    color: isWhite ? 'white' : 'black',
  };

  return (
    <div
      className={cls(styles.collision, isWhite ? styles.white : styles.black)}
      style={colorStyle}
    />
  );
};

export default Loading;
