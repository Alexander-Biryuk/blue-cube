import { Box, Container, Typography } from '@mui/material';
// import widget from '../../assets/Photo.png';
// import { useAppSelector } from '../../hooks';
// import { Link } from 'react-router-dom';
// import { PAGE } from '../paths/paths';

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

type PropType = {
  orderNum: number;
  created: string;
  sum: number;
  pictures: Busket[];
};

export default function OrderListItem({ orderNum, created, sum, pictures }: PropType) {
  // const orders = useAppSelector(state => state.getOrders);
  // console.log(orders);
  return (
    <Container
      style={{
        marginBottom: '24px',
        maxWidth: '1280px',
        backgroundColor: '#FFF',
        borderRadius: '16px',
      }}
    >
      <Box
        height={{xs: 'auto', sm: '96px'}}
        padding={'24px'}
        justifyContent={'space-between'}
        alignItems={'center'}
        display={'flex'}
        sx={{
          maxWidth: '1280px',
        }}
        flexDirection={{xs: 'column', sm: 'row'}}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          // flexDirection={{ xs: 'column', md: 'row' }}
        >
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
              {/* №344300 */}
              №{orderNum}
            </Typography>
          </Box>

          <Box
            ml={'16px'}
            display={'flex'}
            alignItems={'center'}
            maxWidth={'830px'}
            width={{ xs: '104px', md: '330px', lg: '550px', xl: '790px' }}
            overflow={'hidden'}
          >
            {pictures.map((item) => (
              // <Link to={`${PAGE + }`}>
              <img
                key={item.product.id}
                src={item.product.picture}
                style={{ width: '48px', marginRight: '8px' }}
              />
              // </Link>
            ))}
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
              {/* 1 января 2023 г */}
              {created}
            </Typography>
            <Typography variant='secondaryFont' color={'#172029'}>
              {/* 8 324 ₽ */}
              {sum}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
