import { Container, Box } from '@mui/material';
import styles from './GoodsInfo.module.scss';
import MyRating from '../rating/MyRating';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
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
import DirectionButton from './DirectionButton';
import { getCart } from '../../store/busketSlice';

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

  const { num, id } = useParams();
  const page = Number(num);
  const numberId = Number(id);

  //---------additional fetching of description data---------------
  useEffect(() => {
    dispatch(fetchDescription(numberId));
    dispatch(getCart());
  }, [dispatch, numberId]);

  const good = useAppSelector((state) => state.description.data);
  const loading = useAppSelector((state) => state.description.loading);
  const error = useAppSelector((state) => state.description.error);

  //--------calculate next id and previous id from initial products list-------------
  const data = useAppSelector((state) => state.products.products);
  const products = data.data;
  const cardsPerPage = data.meta.count;
  const nextIndexId = products.findIndex((item) => +item.id == numberId) + 1;
  const prevIndexId = products.findIndex((item) => +item.id == numberId) - 1;
  const nextId =
    nextIndexId >= cardsPerPage - 1 ? products[cardsPerPage - 1]?.id : products[nextIndexId]?.id;
  const prevId = prevIndexId > 0 ? products[prevIndexId]?.id : products[0]?.id;

  //-----------------------------------------------------------------

  //--------get description data from initial data list--------------------
  // const products = useAppSelector((state) => state.products.products.data);
  // const good = products.find((item) => item.id === id?.slice(1));
  //------------------------------------------------------------------------

  //-----------too long title, need to cut it down to 2-3 words-------------
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
      <Box
        mx={'auto'}
        maxWidth={'944px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Link to={`/page/${page}/products/${prevId}`}>
          <DirectionButton direction='backward' />
        </Link>
        <Container
          style={{ maxWidth: '792px' }}
          sx={{
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
        <Link to={`/page/${page}/products/${nextId}`}>
          <DirectionButton direction='forward' />
        </Link>
      </Box>
      <GoodsDescription htmlContent={htmlContent} />
    </div>
  );
}
