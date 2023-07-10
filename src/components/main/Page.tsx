import { Grid } from '@mui/material';
import GoodsCard from '../card/GoodsCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/getProductsSlice';
import { useParams } from 'react-router-dom';
import { selectProductsData } from '../../selectors/selectors';

export default function Page() {
  const { num } = useParams();
  const page = Number(num) || 1;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);
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
