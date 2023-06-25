import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import star from '../../assets/Star.svg';
import emptyStar from '../../assets/EmptyStar.svg';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FABC22',
  },
  '& .MuiRating-iconHover': {
    color: '#FABC22',
  },
});

type Value = { stars: number };

export default function MyRating({ stars }: Value) {
  return (
    <StyledRating
      readOnly
      name='customized-color'
      size='large'
      sx={{ width: '100px' }}
      value={stars}
      getLabelText={(value) => `${value} star${value !== 1 ? 's' : ''}`}
      precision={0.1}
      icon={<img src={star} style={{ width: '12px', marginRight: '4px' }} />}
      emptyIcon={<img src={emptyStar} style={{ width: '12px', marginRight: '4px' }} />}
    />
  );
}
