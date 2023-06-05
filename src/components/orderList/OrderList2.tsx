import { Box, Container, Typography } from '@mui/material';
import widget from '../../assets/Photo.png';
import Order from '../order/Order';

export default function OrderList() {
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
          // bgcolor={'#FFF'}
          // borderRadius={'16px'}
          fontFamily={'Nunitio'}
          fontWeight={700}
          fontSize={'16px'}
          height={'96px'}
          justifyContent={'space-between'}
          display={'flex'}
          sx={{
            maxWidth: '1280px',
          }}
        >
          <Box
            width={'352px'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Box
              width={'120px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'start'}
            >
              <Typography sx={{ fontWeight: 700, color: '#808080' }}>
                Заказ
              </Typography>
              <Typography
                sx={{ fontWeight: 700, fontSize: '20px', color: '#172029' }}
              >
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

          <Box
            width={'252px'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Box
              width={'94px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'end'}
            >
              <Typography sx={{ fontWeight: 700, color: '#808080' }}>
                Оформлено
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#808080' }}>
                На сумму
              </Typography>
            </Box>
            <Box
              width={'150px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'start'}
            >
              <Typography sx={{ fontWeight: 700, color: '#172029' }}>
                1 января 2023 г
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#172029' }}>
                8 324 ₽
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
