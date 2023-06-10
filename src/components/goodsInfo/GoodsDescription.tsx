import { Typography, Container } from "@mui/material";
import parse from 'html-react-parser';

export default function GoodsDescription({htmlContent}: {htmlContent: string}) {

  return (
    <Container
        sx={{
          width: '792px',
          // height: '269px',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          mt: '24px',
        }}
      >
        <Typography component={'p'} sx={{ fontWeight: 700, fontSize: '20px' }}>
          Описание
        </Typography>
        <Typography
          style={{ lineHeight: '20px' }}
          component={'div'}
          sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            mt: '8px',
            color: '#172029',
          }}
        >
          {parse(htmlContent)}
        </Typography>
        {/* <div className={styles.description}>{parse(htmlContent)}</div> */}
      </Container>
  )
}