// main description page component with all buttons
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
import { fetchProducts } from '../../store/getProductsSlice';
import { DESCRIPTION, PAGE } from '../constants/constants';
import {
  selectProductsData,
  selectDescriptionIsLoading,
  selectDescriptionError,
  selectDescriptionGood,
} from '../../selectors/selectors';
import type { GoodType } from '../../types';

export default function GooodsInfo() {
  const dispatch = useAppDispatch();

  const { num, id } = useParams();
  const page = Number(num);
  const numberId = Number(id);

  const good = useAppSelector(selectDescriptionGood);
  const isLoading = useAppSelector(selectDescriptionIsLoading);
  const error = useAppSelector(selectDescriptionError);
  const data = useAppSelector(selectProductsData);

  //--------calculate next id and previous id from initial products list-------------

  useEffect(() => {
    dispatch(fetchDescription(numberId));
    dispatch(getCart());
    if (data.meta.total === 0) dispatch(fetchProducts(page));
  }, [dispatch, numberId, data.meta.total, page]);

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

  if (error) {
    return <NotFound />;
  }

  return (
    <div className={styles.goodsInfo}>
      <GoodsBackButton path={`${PAGE + page}`} />
      <Box
        mx={'auto'}
        maxWidth={'944px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Link to={`${PAGE + page + DESCRIPTION + prevId}`}>
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
          {isLoading ? <Loader /> : null}
          <img src={good?.picture} alt='photo' width={'100%'} style={{ maxWidth: '374px' }} />

          <Container style={{ maxWidth: '350px', padding: 0 }}>
            <GoodsName shortName={shortName} />
            <MyRating stars={good?.rating as number} />
            <GoodsPrice price={good?.price as number} />
            <GoodsButton good={good as GoodType} />
            <GoodsReturnConditions />
          </Container>
        </Container>
        <Link to={`${PAGE + page + DESCRIPTION + nextId}`}>
          <DirectionButton direction='forward' />
        </Link>
      </Box>
      <GoodsDescription htmlContent={htmlContent} />
    </div>
  );
}
