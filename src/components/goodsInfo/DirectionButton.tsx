import { Button } from '@mui/material';
import nextArrow from '../../assets/ForwardArrow.svg';

export default function DirectionButton({ direction }: { direction: string }) {
  return (
    <Button
      sx={{
        display: { xs: 'none', lg: 'flex' },
        backgroundColor: '#E6F1FC',
        color: '#0073E6',
        fontWeight: 700,
        fontSize: '30px',
        minWidth: '52px',
        width: '52px',
        height: '52px',
        borderRadius: '12px 12px 12px 12px',
        '&:hover': {
          backgroundColor: '#99C7F5',
        },
      }}
    >
      {direction === 'forward' ? (
        <img src={nextArrow} alt='next' />
      ) : (
        <img src={nextArrow} alt='prev' style={{ transform: 'scale(-1, 1)' }} />
      )}
    </Button>
  );
}
