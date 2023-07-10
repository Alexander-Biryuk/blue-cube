// little back button on top-left of the description page
import { Box, Typography } from '@mui/material';
import backArrow from '../../assets/BackArrow.svg';
import { Link } from 'react-router-dom';
import { memo } from 'react';

function GoodsBackButton({ path }: { path: string }) {
  return (
    <Link to={path}>
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
