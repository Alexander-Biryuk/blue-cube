import { Box, Container, Typography } from '@mui/material';
import widget from '../../assets/Photo.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OrderListItem from './OrderListItem';
import { selectOrdersIsLoading, selectOrdersMemoized } from '../../selectors/selectors';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyPagination from '../pagination/MyPagination';
import { getOrders } from '../../store/getOrdersSlice';
import { ORDERS, ORDER_DETAILS, numberOfOrdersPerPage } from '../constants/constants';
import Loader from '../loader/Loader';
import styles from './OrderList.module.scss';

// import mockData from './mockOrders.json';

// interface Data {
//   id: string;
//   category: string;
//   title: string;
//   description: string;
//   price: number;
//   picture: string;
//   rating: number;
// }
// interface Busket {
//   product: Data;
//   quantity: number;
//   createdAt: string;
// }

// interface Orders {
//   meta: {
//     count: number;
//     total: number;
//   };
//   data: Busket[][];
// }

// const mock: Orders = mockData;

export default function OrderList() {
  const { num } = useParams();
  const [page, setPage] = useState(Number(num) || 1);
  console.log('page', page)
  // const orders = useAppSelector(selectOrdersMemoized);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders(page));
  }, [dispatch, page]);

  const orders = useAppSelector(selectOrdersMemoized);
  console.log('orders', orders)
  const isLoading = useAppSelector(selectOrdersIsLoading);
  const numberOfOrders = orders.meta.total;
  const numberOfPages = Math.ceil(numberOfOrders / numberOfOrdersPerPage);
  const pageOrderNumber = (page - 1) * numberOfOrdersPerPage;
  return (
    // <div
    //   style={{
    //     backgroundColor: '#F2F6FA',
    //     width: '100%',
    //     minHeight: 'calc(100vh - 48px)',
    //     height: '100%',
    //     padding: '24px',
    //   }}
    // >
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
      {orders.data
        // .slice()
        // .reverse()
        .map((item, index) => {
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
                // orderNum={orders.data.length - index + pageOrderNumber}
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
    // </div>
  );
}
