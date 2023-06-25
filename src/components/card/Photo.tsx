import styles from './GoodsCard.module.scss';

export default function Photo({ photo }: { photo: string }) {
  return (
    <div className={styles.photo}>
      <img src={photo} alt='' />
    </div>
  );
}
