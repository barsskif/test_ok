import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.button}>newstories</h1>
      <h1 className={styles.button}>News</h1>
      <h1 className={styles.button}>News</h1>
    </div>
  );
};
