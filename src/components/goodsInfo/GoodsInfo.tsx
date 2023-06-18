import { Container, Typography, Button, Box } from '@mui/material';
import returnArrow from '../../assets/ReturnArrow.svg';
import styles from './GoodsInfo.module.scss';
import MyRating from '../rating/MyRating';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/busketSlice';
import GoodsName from './GoodsName';
import GoodsPrice from './GoodsPrice';
import GoodsReturnConditions from './GoodsReturnConditions';
import GoodsDescription from './GoodsDescription';
import GoodsButton from './GoodsButton';
import { useEffect } from 'react';
import { fetchDescription } from '../../store/getDescriptionSlice';
import GoodsBackButton from './GoodsBackButton';
import Loader from '../loader/Loader';
import NotFound from '../404/NotFound';
import NextButton from './NextButton';

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

  //---------additional fetching of description data---------------
  const numberId = Number(id?.slice(1));
  useEffect(() => {
    dispatch(fetchDescription(numberId));
  }, [dispatch, numberId]);

  const good = useAppSelector((state) => state.description.data);
  const loading = useAppSelector((state) => state.description.loading);
  const error = useAppSelector((state) => state.description.error);

  //-----------------------------------------------------------------

  //--------get description data from initial data list--------------------
  // const products = useAppSelector((state) => state.products.products.data);
  // const good = products.find((item) => item.id === id?.slice(1));
  //------------------------------------------------------------------------

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className={styles.goodsInfo}>
      <GoodsBackButton />
      <Container
        style={{ maxWidth: '792px' }}
        sx={{
          // width: '792px',
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: { xs: '12px', md: '24px' },
        }}
      >
        <img src={good?.picture} alt='photo' width={'100%'} style={{ maxWidth: '374px' }} />
        {/* <div className={styles.infoContainer}> */}
        <Container style={{ maxWidth: '350px', padding: 0 }}>
          <GoodsName shortName={shortName} />
          <MyRating stars={good?.rating as number} />
          <GoodsPrice price={good?.price as number} />
          <GoodsButton good={good as GoodType} />
          <GoodsReturnConditions />
        </Container>
        {/* </div> */}
      </Container>
      {/* <NextButton /> */}
      <GoodsDescription htmlContent={htmlContent} />
    </div>
  );
}
