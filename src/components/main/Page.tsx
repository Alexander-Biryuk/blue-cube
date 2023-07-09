import { Grid } from '@mui/material';
import GoodsCard from '../card/GoodsCard';
// import styles from './Main.module.scss';
// import MyPagination from '../pagination/MyPagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/getProductsSlice';
// import Loader from '../loader/Loader';
// import { getCart } from '../../store/busketSlice';
import { useParams } from 'react-router-dom';
import { selectProductsData } from '../../selectors/selectors';

// interface PropType {
//   products: [
//     {
//       id: string;
//       category: string;
//       title: string;
//       description: string;
//       price: number;
//       picture: string;
//       rating: number;
//     }
//   ];
// }

export default function Page() {
  const { num } = useParams();
  const page = Number(num) || 1;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page])
  // const products = useAppSelector(state => state.products.products.data);
  const products = useAppSelector(selectProductsData).data;

  return (
    <Grid
      container
      columnSpacing={'24px'}
      rowSpacing={'24px'}
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
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
  );
}
