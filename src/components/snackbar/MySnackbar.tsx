import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type PropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};
export default function MySnackbar({ open, setOpen, message }: PropType) {
  const action = (
    <>
      <Button color='secondary' size='medium' onClick={() => setOpen(false)}></Button>
      <IconButton size='medium' aria-label='close' color='inherit' onClick={() => setOpen(false)}>
        <CloseIcon fontSize='medium' />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
        action={action}
        ContentProps={{
          sx: {
            background: '#0073E6',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
          },
        }}
      />
    </div>
  );
}
