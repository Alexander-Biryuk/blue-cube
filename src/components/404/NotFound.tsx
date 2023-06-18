import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.notFoundContainer}>
      <SentimentVeryDissatisfiedIcon color='primary' sx={{fontSize: '100px'}}/>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Button
        variant='contained'
        disableElevation
        color='primary'
        onClick={goBack}
        sx={{
          backgroundColor: 'primary',
          textTransform: 'none',
          color: '#FFF',
          width: '182px',
          height: '52px',
          borderRadius: '12px',
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: '16px',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        Назад
      </Button>
    </div>
  );
}
