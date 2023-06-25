import { Typography } from '@mui/material';

export default function CardName({ name }: { name: string }) {
  return (
    <Typography variant='primaryFont' component='p' marginBottom={'6px'}>
      {name}
    </Typography>
  );
}
