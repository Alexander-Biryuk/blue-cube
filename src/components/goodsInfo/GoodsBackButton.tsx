import { Box, Typography } from '@mui/material';
import backArrow from '../../assets/BackArrow.svg';
import { Link, useParams } from 'react-router-dom';

export default function GoodsBackButton() {
  const { num } = useParams();
  const page = Number(num);

  return (
    <Link to={`/page/${page}`}>
      <Box
        display={'flex'}
        width={'73px'}
        justifyContent={'space-between'}
        position={'fixed'}
        left={'34px'}
        sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
      >
        <img src={backArrow} alt='arrow' />
        <Typography variant='secondaryFont' color={'#0073E6'}>
          Назад
        </Typography>
      </Box>
    </Link>
  );
}
