import styles from './Loader.module.scss';
import cube from '../../assets/Cube.svg';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      {/* <img className={styles.loader} src={cube} alt="loader" /> */}
    </div>
  )
}