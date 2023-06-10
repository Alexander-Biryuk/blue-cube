import { Container, Typography, Button } from '@mui/material';
import returnArrow from '../../assets/ReturnArrow.svg';
import styles from './GoodsInfo.module.scss';
import MyRating from '../rating/StyledRating';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import parse from 'html-react-parser';
import { addToCart } from '../../store/busketSlice';
import GoodsName from './GoodsName';
import GoodsPrice from './GoodsPrice';
import GoodsReturnConditions from './GoodsReturnConditions';
import GoodsDescription from './GoodsDescription';
import GoodsButton from './GoodsButton';

function numberWithSpaces(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

export default function GooodsInfo() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const products = useAppSelector((state) => state.products.products.data);
  const good = products.find((item) => item.id === id?.slice(1));

  //-----------to long title, need to cut it down to 2-3 words-------------
  let shortName = '';
  if (good !== undefined) {
    shortName = good.title;
    let i = 4;
    while (shortName.length > 22) {
      shortName = good?.title.split(' ').slice(0, i).join(' ');
      i--;
    }
  }

  const htmlContent = good?.description || '';

  return (
    <div className={styles.goodsInfo}>
      <Container
        sx={{
          width: '792px',
          height: '422px',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <img src={good?.picture} alt='photo' />
        <div className={styles.infoContainer}>
          <GoodsName shortName={shortName} />
          <MyRating stars={good?.rating as number} />
          <GoodsPrice price={good?.price as number} />
          <GoodsButton good={good as GoodType} />
          <GoodsReturnConditions />
        </div>
      </Container>
      <GoodsDescription htmlContent={htmlContent} />
    </div>
  );
}
