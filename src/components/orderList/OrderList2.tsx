import { Box, Container, Typography } from '@mui/material';
import widget from '../../assets/Photo.png';
import { useAppSelector } from '../../hooks';

export default function OrderList() {
  const orders = useAppSelector(state => state.orders);
  console.log(orders);
  return (
    <div
      style={{
        backgroundColor: '#F2F6FA',
        width: '100%',
        height: 'calc(100vh - 48px)',
        padding: '24px',
      }}
    >
      <Container
        style={{
          maxWidth: '1280px',
          backgroundColor: '#FFF',
          borderRadius: '16px',
        }}
      >
        <Box
          height={'96px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          display={'flex'}
          sx={{
            maxWidth: '1280px',
          }}
        >
          <Box width={'352px'} display={'flex'} justifyContent={'space-between'}>
            <Box
              width={'120px'}
              height={'48px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-around'}
              alignItems={'start'}
            >
              <Typography variant={'secondaryFont'}>Заказ</Typography>
              <Typography variant={'secondaryFont'} fontSize={'20px'} color={'#172029'}>
                №344300
              </Typography>
            </Box>

            <Box width={'216px'} display={'flex'} alignItems={'center'}>
              <img src={widget} style={{ width: '48px' }}></img>
              <img src={widget} style={{ width: '48px' }}></img>
              <img src={widget} style={{ width: '48px' }}></img>
              <img src={widget} style={{ width: '48px' }}></img>
            </Box>
          </Box>

          <Box width={'252px'} display={'flex'} justifyContent={'space-between'}>
            <Box
              width={'94px'}
              height={'48px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-around'}
              alignItems={'end'}
            >
              <Typography variant='secondaryFont'>Оформлено</Typography>
              <Typography variant='secondaryFont'>На сумму</Typography>
            </Box>
            <Box
              width={'150px'}
              height={'48px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-around'}
              alignItems={'start'}
            >
              <Typography variant='secondaryFont' color={'#172029'}>
                1 января 2023 г
              </Typography>
              <Typography variant='secondaryFont' color={'#172029'}>
                8 324 ₽
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
