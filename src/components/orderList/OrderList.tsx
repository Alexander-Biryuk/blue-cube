import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OrderListItem from './OrderListItem';
import { selectOrdersError, selectOrdersIsLoading, selectOrdersMemoized } from '../../selectors/selectors';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyPagination from '../pagination/MyPagination';
import { getOrders } from '../../store/getOrdersSlice';
import { ORDERS, ORDER_DETAILS, numberOfOrdersPerPage } from '../constants/constants';
import Loader from '../loader/Loader';
import styles from './OrderList.module.scss';
import NotFound from '../404/NotFound';

export default function OrderList() {
  const { num } = useParams();
  const [page, setPage] = useState(Number(num) || 1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders(page));
  }, [dispatch, page]);

  const orders = useAppSelector(selectOrdersMemoized);
  const isLoading = useAppSelector(selectOrdersIsLoading);
  const error = useAppSelector(selectOrdersError);
  const numberOfOrders = orders.meta.total;
  const numberOfPages = Math.ceil(numberOfOrders / numberOfOrdersPerPage);
  const pageOrderNumber = (page - 1) * numberOfOrdersPerPage;

  if (error ) {
    return <NotFound />
  }
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      width={'100%'}
      minHeight={'calc(100vh - 48px)'}
      height={'100%'}
      padding={'24px'}
      bgcolor={'#F2F6FA'}
    >
      {isLoading ? <Loader /> : null}
      {orders.data.map((item, index) => {
        const sum = item.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
        const orderDate = new Date(item[0].createdAt);
        const formattedDate = orderDate.toLocaleDateString('Ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return (
          <Link key={index} to={ORDERS + page + ORDER_DETAILS + index} className={styles.links}>
            <OrderListItem
              orderNum={index + pageOrderNumber + 1}
              sum={sum}
              created={formattedDate}
              pictures={item}
            />
          </Link>
        );
      })}
      <MyPagination link={ORDERS} numberOfPages={numberOfPages} page={page} setPage={setPage} />
    </Box>
  );
}
