import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import widget from '../../assets/Photo.png';
import { useState } from 'react';
import Counter from './Counter';

function numberWithSpaces(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function Order() {
  const [count, setCount] = useState(0);
  return (
    <Paper
      elevation={16}
      sx={{
        width: '560px',
        padding: '24px',
        borderRadius: '24px',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box
          width={'184px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <img src={widget} style={{ width: '52px' }}></img>
          <Typography sx={{ fontFamily: 'Nunito', fontSize: '16px' }}>
            Куртка Lassie
          </Typography>
        </Box>

        {/* <Counter count={count} setCount={setCount} /> */}

        <Box width={'112px'}>
          {count > 1 && (
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#808080',
                textAlign: 'right',
              }}
            >
              6 199 ₽ за шт.
            </Typography>
          )}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '20px',
              color: '#172029',
              textAlign: 'right',
            }}
          >
            {numberWithSpaces(6199 * count)} ₽
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: '16px', color: '#F2F2F2' }} />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'end'}
        mt={'16px'}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>
          Итого
        </Typography>

        <Typography sx={{ fontWeight: 800, fontSize: '28px' }}>
          {numberWithSpaces(6199 * count)} ₽
        </Typography>
      </Box>
      <Button
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
            // backgroundColor: 'primary.light'
            opacity: 0.8,
          },
        }}
      >
        Оформить заказ
      </Button>
    </Paper>
  );
}
