import styles from './MyPagination.module.scss';

type PropType = {
  number: number | string;
  setPage: (value: React.SetStateAction<number>) => void;
};

export default function MyButton({ number, setPage }: PropType) {
  return (
    <button className={styles.myButton} onClick={() => setPage((prevPage) => prevPage - 1)}>
      {number}
    </button>
  );
}
