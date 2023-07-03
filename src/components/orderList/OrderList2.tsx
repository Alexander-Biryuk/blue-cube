import { Box, Container, Typography } from '@mui/material';
import widget from '../../assets/Photo.png';
import { useAppSelector } from '../../hooks';
import OrderListItem from './OrderListItem';

import mockData from './mockOrders.json';

interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}
interface Busket {
  product: Data;
  quantity: number;
  createdAt: string;
}

interface Orders {
  meta: {
    count: number;
    total: number;
  };
  data: Busket[][];
}

const mock: Orders = mockData;

export default function OrderList() {
  // const orders = useAppSelector((state) => state.getOrders);
  // console.log(orders);
  return (
    <div
      style={{
        backgroundColor: '#F2F6FA',
        width: '100%',
        // height: 'calc(100vh - 48px)',
        height: '100%',
        padding: '24px',
      }}
    >
      {mock.data.map((item, index) => {
        const sum = item.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
        const orderDate = new Date(item[0].createdAt);
        const formattedDate = orderDate.toLocaleDateString('Ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return <OrderListItem orderNum={index} sum={sum} created={formattedDate} pictures={item} />;
      })}
    </div>
  );
}
