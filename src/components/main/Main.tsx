import { Box } from '@mui/material';
import styles from './Main.module.scss';
import MyPagination from '../pagination/MyPagination';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import Loader from '../loader/Loader';
import Page from './Page';
import { useParams } from 'react-router-dom';
import {
  selectProductsData,
  selectProductsError,
  selectProductsIsLoading,
} from '../../selectors/selectors';
import MySnackbar from '../snackbar/MySnackbar';
import { PAGE, numberOfProductsPerPage } from '../constants/constants';

export default function Main() {
  const { num } = useParams();

  const [page, setPage] = useState(Number(num) || 1);

  const isLoading = useAppSelector(selectProductsIsLoading);
  const fetchError = useAppSelector(selectProductsError);
  const numberOfProducts = useAppSelector(selectProductsData).meta.total;
  const numberOfPages = Math.ceil(numberOfProducts / numberOfProductsPerPage);

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

  const [openSnackBar, setOpenSnackBar] = useState(true);

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
        {isLoading && !fetchError ? <Loader /> : null}
        {fetchError ? (
          <MySnackbar open={openSnackBar} setOpen={setOpenSnackBar} message='Сервер не отвечает' />
        ) : null}
        <Page />
        <MyPagination link={PAGE} numberOfPages={numberOfPages} page={page} setPage={setPage} />
      </Box>
    </div>
  );
}
