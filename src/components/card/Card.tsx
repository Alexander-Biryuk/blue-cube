import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CardActionArea, Rating } from '@mui/material';
import photo from '../../assets/Photo.png';
import star from '../../assets/Star.svg';
import emptyStar from '../../assets/EmptyStar.svg';
import styles from './Card.module.scss';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FABC22',
  },
  '& .MuiRating-iconHover': {
    color: '#FABC22',
  },
});

export default function GoodsCard() {
  return (
    <Card
      sx={{
        maxWidth: 250,
        backgroundColor: '#fff',
        borderRadius: '16px',
        '&:hover': {
          backgroundColor: '#fff',
          boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia component='img' height='250' image={photo} alt='photo' />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{
              fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 16,
              color: '#172029',
            }}
          >
            Куртка Lassie
          </Typography>
          {/* <Rating name='read-only' value={5} readOnly /> */}
          <StyledRating
            name='customized-color'
            size='large'
            sx={{width: '100px'}}
            defaultValue={5}
            getLabelText={(value) => `${value} star${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<img src={star} style={{width: '12px', marginRight: '4px'}}/>}
            emptyIcon={<img src={emptyStar} style={{width: '12px', marginRight: '4px'}}/>}
          />
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 800,
              fontSize: 22,
              color: '#172029',
            }}
          >
            4 799 ₽
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
