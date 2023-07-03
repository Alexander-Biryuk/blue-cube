import { Box, Typography } from '@mui/material';
import backArrow from '../../assets/BackArrow.svg';
import { Link, useParams } from 'react-router-dom';
import { PAGE } from '../paths/paths';
import { memo } from 'react';

function GoodsBackButton() {
  const { num } = useParams();
  const page = Number(num);
  return (
    <Link to={`${PAGE + page}`}>
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

const MemoizedBackButton = memo(GoodsBackButton);
export default MemoizedBackButton;
