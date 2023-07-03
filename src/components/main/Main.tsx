import { Box } from '@mui/material';
import styles from './Main.module.scss';
import MyPagination from '../pagination/MyPagination';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
// import { fetchProducts } from '../../store/getProductsSlice';
import Loader from '../loader/Loader';
// import { getCart } from '../../store/busketSlice';
import Page from '../page/Page';
import { useParams } from 'react-router-dom';
import { selectData, selectProductsIsLoading } from '../../selectors/selectors';

export default function Main() {
  const { num } = useParams();
  // const page = Number(id);
  // let currentPage = Number(sessionStorage.getItem('page'))
  //   ? Number(sessionStorage.getItem('page'))
  //   : 1;
  // if (!currentPage) currentPage = 1;

  const [page, setPage] = useState(Number(num) || 1);

  // let store = sessionStorage.getItem('store');
  // console.log(JSON.parse(store));

  //-----------trying to restore scroll position----------------

  // const scrollpos = sessionStorage.getItem("scrollpos");
  //   if (scrollpos) window.scrollTo(0, +scrollpos);
  // console.log('scrollpos', scrollpos)
  //-------------------------------------------

  // useEffect(() => {
  //   dispatch(fetchProducts(page));
  // }, [dispatch, page]);

  // useEffect(() => {
  //   dispatch(getCart());
  // },[dispatch])

  // const products = useAppSelector((state) => state.products.products.data);

  // const isLoading = useAppSelector((state) => state.products.loading);
  // const numberOfProducts = useAppSelector((state) => state.products.products.meta.total);

  const isLoading = useAppSelector(selectProductsIsLoading);
  const numberOfProducts = useAppSelector(selectData).meta.total;
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
  //--------------------- end of infinite scroll code----------------------------

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <div className={styles.main}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        pt={'24px'}
        px={'24px'}
        flexGrow={1}
      >
        {isLoading ? <Loader /> : null}
        <Page />
        <MyPagination numberOfPages={numberOfPages} page={page} setPage={setPage} />
      </Box>
    </div>
  );
}

