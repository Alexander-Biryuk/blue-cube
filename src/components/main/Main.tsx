import GoodsCard from '../card/Card';
import GooodsInfo from '../goodsInfo/GoodsInfo';
import Order from '../order/Order';
import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles.main}>
      <GoodsCard />
      {/* <Order /> */}
      <GooodsInfo />
    </div>
  );
}


