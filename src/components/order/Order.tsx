import styles from './Order.module.scss';
import widget from '../../assets/Photo.png';

export default function Order() {
  return (
    <div className={styles.order}>
      <div className={styles.container}>
        <div className={styles.orderNumberAndWidgets}>

        <div className={styles.orderNumber}>
          <div>Заказ</div>
          <div className={styles.number}>№344300</div>
        </div>
        <div className={styles.imagesContainer}>
          <img className={styles.widget} src={widget} alt="widget" />
          <img className={styles.widget} src={widget} alt="widget" />
          <img className={styles.widget} src={widget} alt="widget" />
          <img className={styles.widget} src={widget} alt="widget" />
        </div>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.text}>Оформлено<br/>На сумму</div>
          <div className={styles.dateAndPrice}>1 января 2023 г<br/>8 324 ₽</div>
        </div>
      </div>
    </div>
  )
}