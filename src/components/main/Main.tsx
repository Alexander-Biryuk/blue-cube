import { Box, Grid } from '@mui/material';
import GoodsCard from '../card/GoodsCard';
import styles from './Main.module.scss';
import MyPagination from '../pagination/MyPagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../store/getProductsSlice';
import MyPagination2 from '../pagination/MyPagination2';

export default function Main() {
  let currentPage = Number(sessionStorage.getItem('page'))
    ? Number(sessionStorage.getItem('page'))
    : 1;
  if (!currentPage) currentPage = 1;

  const [page, setPage] = useState(currentPage);
  const dispatch = useAppDispatch();

  //-----------trying to restore scroll position----------------
  // const scrollpos = sessionStorage.getItem("scrollpos");
  //   if (scrollpos) window.scrollTo(0, +scrollpos);
  // console.log('scrollpos', scrollpos)
  //-------------------------------------------

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const products = useAppSelector((state) => state.products.products.data);
  const numberOfProducts = useAppSelector(
    (state) => state.products.products.meta.total
  );
  const numberOfPages = Math.ceil(numberOfProducts / 15);
  // console.log(numberOfPages);

  //-------------infinite scroll----------------------------

  // const [fetching, setFetching] = useState(true); 
  // useEffect(() => {
  //   if (fetching) {
  //     console.log('fetching');
  //     if (page <= (numberOfPages || 1)) {
  //       setPage((prevPage) => prevPage + 1);
  //       setFetching(false);
  //       dispatch(fetchProducts(page));
  //     }
  //   }
  // }, [fetching]);

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, []);
  // const scrollHandler = (e: any) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     300
  //   ) {
  //     console.log('scroll', e.target.documentElement.scrollTop);
  //     setFetching(true);
  //     sessionStorage.setItem("scrollpos", e.target.documentElement.scrollHeight);
  //   }

  //   // console.log('scrollHeight', e.target.documentElement.scrollHeight);
  //   // console.log('scrollTop', e.target.documentElement.scrollTop);
  //   // console.log('innerHeight', window.innerHeight);
  // };
  //---------------------infinite scroll----------------------------

  return (
    <div className={styles.main}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        pt={'24px'}
      >
        <Grid
          container
          columnSpacing={'24px'}
          rowSpacing={'24px'}
          columns={5}
          maxWidth={'1346px'}
        >
          {products.map((item) => (
            <GoodsCard
              key={item.id}
              id={item.id}
              picture={item.picture}
              name={item.title}
              rating={item.rating}
              price={item.price}
            />
          ))}
        </Grid>
        <MyPagination
          numberOfPages={numberOfPages}
          page={page}
          setPage={setPage}
        />
        {/* <MyPagination2 numberOfPages={numberOfPages} page={page} setPage={setPage}/> */}
      </Box>
    </div>
  );
}
