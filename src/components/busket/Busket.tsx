import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Counter from './Counter';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeFromCart, updateCart } from '../../store/busketSlice';
import trash from '../../assets/Trash.svg';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { DESCRIPTION, PAGE } from '../paths/paths';
import { submitCart } from '../../store/ordersSlice';

// adds space in price, i.e. 1000 becomes 1 000
function numberWithSpaces(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// cutting long name to 2-3 words
function shortName(name: string) {
  let short = '';
  if (name !== undefined) {
    short = name;
    let i = 4;
    while (short.length > 22) {
      short = name.split(' ').slice(0, i).join(' ');
      i--;
    }
    return short;
  }
}

export default function Busket() {
  const currentUrl = window.location.href;
  const match = currentUrl.match(/page\/(\d+)/);
  const page = match && match[1];
  // console.log(page)
  const dispatch = useAppDispatch();

  const busket = useAppSelector((state) => state.busket);

  return (
    <Paper
      component={'div'}
      onMouseLeave={() => dispatch(updateCart(busket))}
      elevation={16}
      sx={{
        width: '560px',
        padding: '24px',
        borderRadius: '24px',
      }}
    >
      {busket.map((item) => (
        <div key={item.product.id}>
          <Box
            key={item.product.id}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Link to={`${PAGE + page + DESCRIPTION + item.product.id}`}>
              <Box
                width={'184px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <img src={item.product.picture} style={{ width: '52px' }}></img>
                <Typography sx={{ ml: '16px', fontFamily: 'Nunito', fontSize: '16px' }}>
                  {shortName(item.product.title)}
                </Typography>
              </Box>
            </Link>

            <Counter good={item.product} />

            <Box width={'112px'}>
              {item.quantity > 1 && (
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#808080',
                    textAlign: 'right',
                  }}
                >
                  {numberWithSpaces(item.product.price)} за шт.
                </Typography>
              )}
              {item.quantity > 0 && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#172029',
                    textAlign: 'right',
                  }}
                >
                  {numberWithSpaces(item.product.price * item.quantity)} ₽
                </Typography>
              )}
              {item.quantity <= 0 && (
                <Button
                  variant='contained'
                  disableElevation
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  sx={{
                    backgroundColor: '#fff',
                    textTransform: 'none',
                    color: '#FFF',
                    width: '112px',
                    height: '52px',
                    borderRadius: '12px',
                    fontFamily: 'Nunito',
                    fontWeight: 700,
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      opacity: 0.8,
                    },
                  }}
                >
                  <img src={trash} alt='delete' />
                </Button>
              )}
            </Box>
          </Box>
          <Divider sx={{ mt: '16px', mb: '16px', color: '#F2F2F2' }} />
        </div>
      ))}
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'end'} mt={'16px'}>
        <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>Итого</Typography>

        <Typography sx={{ fontWeight: 800, fontSize: '28px' }}>
          {numberWithSpaces(
            busket.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
          )}{' '}
          ₽
        </Typography>
      </Box>
      <Button
        onClick={() => dispatch(submitCart())}
        variant='contained'
        disableElevation
        color='primary'
        sx={{
          backgroundColor: 'primary',
          textTransform: 'none',
          color: '#FFF',
          width: '512px',
          height: '52px',
          borderRadius: '12px',
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: '16px',
          mt: '16px',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        Оформить заказ
      </Button>
    </Paper>
  );
}
