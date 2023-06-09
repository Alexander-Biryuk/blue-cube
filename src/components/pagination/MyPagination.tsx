import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PropType {
  numberOfPages: number;
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
}

export default function MyPagination({
  numberOfPages,
  page,
  setPage,
}: PropType) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={(_, num) => {
          setPage(num);
          sessionStorage.setItem('page', `${num}`);
        }}
        color='primary'
        boundaryCount={1}
        sx={{
          '.MuiPaginationItem-root': {
            mt: '40px',
            mb: '40px',
            background: '#E6F1FC',
            borderRadius: '12px',
            width: '52px',
            height: '52px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '16px',
            color: '#0073E6',
            '&:hover': {
              backgroundColor: '#CFE4FA',
              color: '#0073E6',
            },
            '&:active': {
              backgroundColor: '#0073E6',
              color: '#fff',
            },
          },
          '.MuiPaginationItem-text': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.Mui-selected': {
            background: '#0073E6',
            color: '#fff',
            '&:hover': {
              background: '#0073E6',
              color: '#fff'
            }
          },
        }}
      />
    </Stack>
  );
}
