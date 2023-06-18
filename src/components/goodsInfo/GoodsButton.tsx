import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToCart } from '../../store/busketSlice';
import styles from './GoodsInfo.module.scss';
import Counter from '../order/Counter';

interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

export default function GoodsButton({ good }: { good: GoodType }) {
  const busket = useAppSelector((state) => state.busket.data);
  const dispatch = useAppDispatch();
  console.log(good);
  return (
    <>
      {busket && busket.includes(good) ? (
        <div className={styles.buttonContainer}>
          <Counter good={good} />
          <Button
            variant='contained'
            disableElevation
            color='primary'
            onClick={() => dispatch(addToCart(good))}
            sx={{
              backgroundColor: 'primary',
              textTransform: 'none',
              color: '#FFF',
              width: '182px',
              height: '52px',
              borderRadius: '12px',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '16px',
              // mt: '8px',
              '&:hover': {
                // backgroundColor: 'primary.light'
                opacity: 0.8,
              },
            }}
          >
            Оформить заказ
          </Button>
        </div>
      ) : (
        <Button
          variant='contained'
          disableElevation
          color='primary'
          onClick={() => dispatch(addToCart(good))}
          sx={{
            backgroundColor: 'primary',
            textTransform: 'none',
            color: '#FFF',
            width: { xs: '100%', md: '346px' },
            height: '52px',
            borderRadius: '12px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
            mt: '8px',
            '&:hover': {
              // backgroundColor: 'primary.light'
              opacity: 0.8,
            },
          }}
        >
          Добавить в корзину
        </Button>
      )}
    </>
  );
}
